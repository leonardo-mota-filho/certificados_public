import {useEffect ,useState} from "react";
import {useParams} from "react-router-dom"
import {PDFViewer} from '@react-pdf/renderer';
import services from '../services/services.js'
import CertificateModel from "../models/certificateModel.js";

export default function CertificateDoc() {
   const {cpf,classid} = useParams()

   const [data,setData] = useState({});
   const [print,setPrint] = useState(false)
   const [erro,setErro] = useState(false)
   const [assinaturaProf,setAssinaturaProf] = useState("")
   useEffect(() => {getData(cpf,classid)}, []);

    const getImage = (signatureurl) =>{
        var link = `https://drive.google.com/uc?export=view&id=${signatureurl.split('/')[5]}`
        services.getImage(link)
            .then((response)=>{
                console.log(response)
                setAssinaturaProf(`data:${response.headers["content-type"]};base64,${response.data}`)
                console.log("CARREGADO")
                setPrint(true)
            })
            .catch((err)=>{
                console.log(err)
            })
    }

   const getData = (cpf,classid) => {    
    services.getCertificateByCpfClass(`${cpf}`,`${classid}`)
        .then((response) => {
            if(response.data[0]["isavailable"] == true){
                var conteudoFinal = ""
                for (let i = 0; i < response.data[0]["content"].length; i++) {
                    if(response.data[0]["content"][i]=='*'){
                        conteudoFinal += '\n';
                    } else{
                        conteudoFinal += response.data[0]["content"][i];
                    }
                }
                setData({...response.data[0],conteudoFinal:conteudoFinal})
                if(response.data[0]["signatureurl"] != null) {
                    getImage(response.data[0]["signatureurl"])
                } else{
                    setPrint(true)
                }
            } else{
                setErro(true)
            }
            
        })
        .catch((err) => {
            console.log(err)
            setErro(true)
        })
    }
    return (
            <div className="flex flex-row min-h-screen justify-center items-center">
                {erro == true ? (<h1 className="font-bold text-red-500">Erro ao carregar certificado.</h1>) : (
                    print == true ? (
                        <PDFViewer key={Date.now()} className="w-full h-[1200px]" >
                            <CertificateModel data={data} signature={assinaturaProf}/>
                        </PDFViewer>
                    ) : (
                    <div>Carregando Certificado...</div>
                    )
                )}
            </div>
    );
}

