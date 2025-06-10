import React, {SetStateAction, useEffect ,useState} from "react";
import { Page, Image, Text, View, Document, StyleSheet, PDFViewer,Font} from '@react-pdf/renderer';
import services from '../services/services.js'
import certificado from '../assets/certificadobackground.png';
import assinature from '../assets/assinaturaProf.png'

// Solução por davidecarpini no Github, na issue: https://github.com/diegomura/react-pdf/issues/311
Font.registerHyphenationCallback(word => (
    [word]
  ));

// Create styles
const styles = StyleSheet.create({
    body: {
        margin: 0,
    },
    image: {
        height: "100%", 
        width: "100%",
        marginHorizontal: 'auto',
        zIndex: -1
    },
    imageAssinatura: {
        position: 'absolute',
        width: '30%',
        height:'auto',
        top:'-50px'
    },
    textNormal: {
        position: "absolute",
        fontSize: "26px",
        fontWeight: 'normal',
        left: '40px',
        right: '40px',
        marginHorizontal: 'auto',
        textAlign: "justify",
        lineHeight: '40px',
        hyphens: 'none'
    },
    textBold: {
        position: "absolute",
        fontSize: "26px",
        fontWeight: 'bold',
        left: '40px',
        right: '40px',
        marginHorizontal: 'auto',
        textAlign: "justify",
        lineHeight: '40px',
        hyphens: 'none'
    },
    conteudo:{
        position:'absolute',
        width:'100%',
        marginHorizontal:'4%',
        marginVertical:'18%',
        hyphens: 'none'
    },
    textTituloConteudo:{
        position: "absolute",
        fontWeight: 'bold',
        fontSize: "22px",
        lineHeight: '25px',
        hyphens: 'none'
    },
    textConteudo:{
        position: "absolute",
        top:"35px",
        fontWeight: 'bold',
        fontSize: "16px",
        left:'10px',
        lineHeight: '30px',
        hyphens: 'none'
    },
    linhaAssinatura:{
        position: "absolute",
        fontSize: "26px",
        marginHorizontal: 'auto',
        textAlign: "center",
    },

    textAssinatura:{
        position: "absolute",
        fontSize: "20px",
        marginHorizontal: 'auto',
        textAlign: "center",
    },
    assinatura:{
        position: 'absolute',
        width:'100%',
        display:'flex',
        alignItems: 'center',
        top:'75%'
    },
    assinaturaLeft:{
        position: 'absolute',
        width:'100%',
        left:'-20%',
        display:'flex',
        alignItems: 'center',
        top:'75%'
    },
    assinaturaRight:{
        position: 'absolute',
        width:'100%',
        left:'20%',
        display:'flex',
        alignItems: 'center',
        top:'75%'
    },
});

export default function NanoCertificateModel({data,signature}){
    if(data["signatureurl"] == null){
        return <Certificado1Prof data={data}/>
    } else{
        return <Certificado2Prof signature={signature} data={data}/>
    }
}

const Certificado1Prof = ({data}) => (
        <Document>
           <Page size="A4" orientation="landscape" style={styles.body}>
                    <View >
                        <Image style={styles.image} src={certificado}></Image>
                    </View>
                    <View style={styles.assinatura}>
                        <Image src={assinature} style={styles.imageAssinatura}/>
                        <Text style={{...styles.linhaAssinatura}}>___________________</Text>
                        <Text style={{top:'40px',...styles.textAssinatura}}>Fulano{'\n'} Professor</Text>
                    </View>
                    <Text style={{top:"170px", ...styles.textNormal }}>
                    Certificamos que <Text style={{...styles.textBold }}>{data["sname"].toUpperCase()}</Text> participou de <Text style={{...styles.textBold }}>{data["name"]}</Text>, realizado nos dias {data["period"]}, com carga horária de {data["hours"]} horas-aula.
                    </Text>
            </Page>
            <Page size="A4" orientation="landscape" style={styles.body}>
                <View >
                    <Image style={styles.image} src={certificado}></Image>
                </View>
                <View style={styles.assinatura}>
                    <Image src={assinature} style={styles.imageAssinatura}/>
                    <Text style={{...styles.linhaAssinatura}}>___________________</Text>
                    <Text style={{top:'40px',...styles.textAssinatura}}>Fulano{'\n'} Professor</Text>
                </View>
                <View style={styles.conteudo}>
                    <Text style={{...styles.textTituloConteudo }}>{data["name"]}</Text>
                    <Text style={{...styles.textConteudo }}>Conteúdo Programático - {data["hours"]} horas-aula{'\n'}{data["conteudoFinal"]}</Text>
                    <Text style={{top:'430px',left:'745px',fontSize:"10px"}}>{data["id"]}</Text>
                </View>
            </Page>
        </Document>
    );
    const Certificado2Prof = ({signature,data}) => (
        <Document>
           <Page size="A4" orientation="landscape" style={styles.body}>
                   
                    <View >
                        <Image style={styles.image} src={certificado}></Image>
                    </View>
                    <View style={styles.assinaturaLeft}>
                        <Image src={assinature} style={styles.imageAssinatura}/>
                        <Text style={{...styles.linhaAssinatura}}>___________________</Text>
                        <Text style={{top:'40px',...styles.textAssinatura}}>Fulano{'\n'} Professor</Text>
                    </View>
                    <View style={styles.assinaturaRight}>
                        <Image src={signature} style={styles.imageAssinatura}/>
                        <Text style={{...styles.linhaAssinatura}}>___________________</Text>
                        <Text style={{top:'40px',...styles.textAssinatura}}>{data["secondprofname"]}{'\n'} Professor</Text>
                    </View>
                    
                    <Text style={{top:"170px", ...styles.textNormal }}>
                    Certificamos que <Text style={{...styles.textBold }}>{data["sname"].toUpperCase()}</Text> participou de <Text style={{...styles.textBold }}>{data["name"]}</Text>, realizado nos dias {data["period"]}, 
                    com carga horária de {data["hours"]} horas-aula.
                    </Text>
            </Page>
            <Page size="A4" orientation="landscape" style={styles.body}>
                <View >
                    <Image style={styles.image} src={certificado}></Image>
                </View>
                <View style={styles.assinaturaLeft}>
                    <Image src={assinature} style={styles.imageAssinatura}/>
                    <Text style={{...styles.linhaAssinatura}}>___________________</Text>
                    <Text style={{top:'40px',...styles.textAssinatura}}>Fulano{'\n'} Professor</Text>
                </View>
                <View style={styles.assinaturaRight}>
                    <Image src={signature} style={styles.imageAssinatura}/>
                    <Text style={{...styles.linhaAssinatura}}>___________________</Text>
                    <Text style={{top:'40px',...styles.textAssinatura}}>{data["secondprofname"]}{'\n'} Professor</Text>
                </View>
                <View style={styles.conteudo}>
                    <Text style={{...styles.textTituloConteudo }}>{data["name"]}</Text>
                    <Text style={{...styles.textConteudo }}>Conteúdo Programático - {data["hours"]} horas-aula{'\n'}{data["conteudoFinal"]}</Text>
                    <Text style={{top:'430px',left:'745px',fontSize:"10px"}}>{data["id"]}</Text>
                </View>
                
                
            </Page>
        </Document>
    );