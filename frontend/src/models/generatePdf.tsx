import { saveAs } from "file-saver";
import JSZip from "jszip";
import { createRoot } from 'react-dom/client';
import {BlobProvider, PDFViewer} from '@react-pdf/renderer';
import CertificateModel from "../models/certificateModel.js";
import services from "../services/services.js";

  export const validateImageSize = async (link) => {
    return new Promise(async (resolve) => {
      try{
        var img = new Image();
        img.src = await getImage(link)
        img.onload = function(){
          console.log(img.width)
          console.log(img.height)
          console.log(img.width == 700 && img.height == 200 )
          resolve(img.width == 700 && img.height == 200 )
        } 
      } catch (err) {
        console.log(err)
        resolve(false)
      }
    }) 
  }

  export const generateSinglePdf = async (student,classid,setLoading) => {
    try {
      setLoading(true)
      const pdfBlob = await generatePdfUrl(student,classid)
      await saveAs(pdfBlob,`${student["name"]}-${classid}.pdf`)
      setLoading(false)
    } catch (err) {
      console.log(err);
    }
  }

  export const generatePdf = async (students,classid,setLoading) => {
    try {
      setLoading(true)
      const pdfBlobs = await Promise.all(
        students.map((s) => generatePdfUrl(s,classid))
      );
      await createAndDownloadZip(pdfBlobs,students,classid);
      setLoading(false)
    } catch (err) {
      console.log(err);
    }
  };

  const getCertificate = (cpf,classid) => {
    return services.getCertificateByCpfClass(cpf,classid)
      .then((response) => {
        console.log(response)
        var conteudoFinal = ""
        for (let i = 0; i < response.data[0]["content"].length; i++) {
          if(response.data[0]["content"][i]=='*'){
            conteudoFinal += '\n';
          } else{
            conteudoFinal += response.data[0]["content"][i];
          }
        }
        return {...response.data[0],conteudoFinal:conteudoFinal}
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  const getImage = (signatureurl) =>{
    //Modelo  "https://drive.google.com/uc?export=view&id=1croJDJUH0KclFRanXKIOd66WXfoP1iCA"
    var link = `https://drive.google.com/uc?export=view&id=${signatureurl.split('/')[5]}`
    return services.getImage(link)
      .then((response)=>{
        return `data:${response.headers["content-type"]};base64,${response.data}`
      })
  }
  const generatePdfUrl = (student,classid): Promise<Blob> => {
    return new Promise(async (resolve, reject) => {
      var data = await getCertificate(student["scpf"],classid)
      var signature = data["signatureurl"] == null ? null : await getImage(data["signatureurl"])
      
      const pdfElement = (
        <BlobProvider document={<CertificateModel data={data} signature={signature}/>}>
          {({ blob, loading, error }) => {
            if (!loading && !error && blob) {
              resolve(blob);
            } else if (error) {
              reject(error);
            }
            return null;
          }}
        </BlobProvider>
      );
      const root = createRoot(document.createElement("div"))
      root.render(pdfElement)
    });
  };

  async function createAndDownloadZip(pdfBlobs: Blob[],students,classid) {
    const zip = new JSZip();

    for (let i = 0; i < pdfBlobs.length; i++) {
      const blob = pdfBlobs[i];
      zip.file(`${students[i]["name"]}-${i}.pdf`, blob);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, `${classid}.zip`);
  }