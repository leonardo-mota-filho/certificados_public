import React, {useEffect ,useState} from "react";
import { Link, useNavigate} from "react-router-dom";
import services from '../../services/services.js'
import Alert from "../../models/Alert.js";
import validateCpf from "../../models/CpfVerifier.js";
import BackButton from "../../models/BackButton.tsx";
import { validateImageSize } from "../../models/generatePdf.js";
import {authCheck } from "../../models/authCheck.js";

export default function AdminAddProfessor({getProfessorOptions,setDenyAcess}){
    const [alertPost,setAlertPost] = useState({on:false,state:false,msg:""})
    const [newProfessorCpf,setNewProfessorCpf] = useState("")
    const [newProfessorName,setNewProfessorName] = useState("")
    const [newProfessorSignature,setNewProfessorSignature] = useState("")
    const onChangeNewProfessorCpf = (e) => {setNewProfessorCpf(e.target.value)}
    const onChangeNewProfessorName= (e) => {setNewProfessorName(e.target.value)}
    const onChangeNewProfessorSignature = (e) => {setNewProfessorSignature(e.target.value)}

    const postNewProfessor = () => {
        console.log("PROFESSOR ADICIONANDO")
        services.postProfessor({cpf:newProfessorCpf,name:newProfessorName,signatureurl:newProfessorSignature})
            .then((response)=>{
                setAlertPost({on:true,state:true,msg:"Professor criado com sucesso!"})
                getProfessorOptions()
            })
            .catch((err)=>{
                console.log(err)
                authCheck(err,setDenyAcess)
            })    
    }

    const postNewProfessorCheck = async () => {
        console.log("testando")
        validateImageSize(newProfessorSignature)
            .then((result) => {
                if(newProfessorName == "" || newProfessorSignature == ""){
                    setAlertPost({on:true,state:false,msg:"Insira dados válidos!"})
                } else if(validateCpf(newProfessorCpf) == false) {
                    setAlertPost({on:true,state:false,msg:"Insira um CPF válido!"})
                } else if(result == false){
                    setAlertPost({on:true,state:false,msg:"Insira um link de imagem válido! (Google Drive, 700x200)"})
                } else{
                    console.log("validação: ")
                    console.log(result)
                    postNewProfessor()
                }
            })
        .catch((err)=>{
            console.log(err)
            authCheck(err,setDenyAcess)
        })
    }

    const setAlertOn = (on) => {
        setAlertPost({on:on,state:alertPost["state"],msg:alertPost["msg"]})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        postNewProfessorCheck()
    }
    return(
    <div className="text-left lg:w-1/2 md:w-full p-4 mx-auto text-center border">
        <BackButton to="/admin"/>
        <h1 className="font-bold">Adicionar Professor no sistema</h1>
        <form onSubmit={handleSubmit}>
            <h1 className="font-bold">CPF:</h1>
            <input
                type="text"
                className="border border-gray-300 rounded-l px-2 py-1 w-4/5"
                placeholder="CPF do Professor"
                value={newProfessorCpf}
                onChange={onChangeNewProfessorCpf}
            />
            <h1 className="font-bold">Nome:</h1>
            <input
                type="text"
                className="border border-gray-300 rounded-l px-2 py-1 w-4/5"
                placeholder="Nome do Professor"
                value={newProfessorName}
                onChange={onChangeNewProfessorName}
            />
            <h1 className="font-bold">URL da Imagem da assinatura (700x200):</h1>
            <input
                type="text"
                className="border border-gray-300 rounded-l px-2 py-1 w-4/5"
                placeholder="URL da assinatura do Professor"
                value={newProfessorSignature}
                onChange={onChangeNewProfessorSignature}
            />
            <button
                className="bg-blue-500 text-white px-4 py-1 rounded-r"
                onClick={() => (postNewProfessorCheck())}
            >
            Adicionar
            </button>
        </form>
        <Alert alertObj={alertPost} alert={alertPost["on"]} setAlert={setAlertOn}/>
    </div>
    )
}