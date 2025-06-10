import React, {useEffect ,useState} from "react";
import { Link, useNavigate} from "react-router-dom";
import services from '../../services/services.js'
import Alert from "../../models/Alert.js";
import { validateImageSize } from "../../models/generatePdf.js";
import {authCheck} from "../../models/authCheck.js";

export default function AdminUpdateProfessor({getProfessorOptions,professorHtml,setDenyAcess}){
    
    const [alertPost,setAlertPost] = useState({on:false,state:false,msg:""})
    const [prof,setProf] = useState({cpf:"",name:"",signatureurl:""})
    const [confirming,setConfirming] = useState(false)
    const onChangeNewName = (e) => {setProf({cpf:prof["cpf"],name:e.target.value,signatureurl:prof["signatureurl"]})}
    const onChangeNewUrl = (e) => {setProf({cpf:prof["cpf"],name:prof["name"],signatureurl:e.target.value})}
    const onChangeProfessorSelect = (e) => {
        setProf({cpf:e.target.value,name:prof["name"],signatureurl:prof["signatureurl"]})
        services.getProfessorByCpf(e.target.value)
            .then((response) => {
                setProf({cpf:e.target.value,name:response.data[0]["name"],signatureurl:response.data[0]["signatureurl"]})
            })
            .catch((err) => {
                if (authCheck(err,setDenyAcess) == false){
                    setProf({cpf:"",name:"",signatureurl:""})
                    setAlertPost({on:true,state:false,msg:"Selecione um professor válido!"})
                }
            })
       
    }
    const setAlertOn = (on) => {
        setAlertPost({on:on,state:alertPost["state"],msg:alertPost["msg"]})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateProfessorCheck()
    }

    const updateProfessor = () =>{
        services.updateProfessor({cpf:prof["cpf"],name:prof["name"],signatureurl:prof["signatureurl"]})
            .then((response) => {
                console.log(response)
                setAlertPost({on:true,state:true,msg:"Professor atualizado com sucesso!"})
                getProfessorOptions()
            })
            .catch((err)=>{
                console.log(err)
                authCheck(err,setDenyAcess)
            })
    }

    const updateProfessorCheck = async () => {
        validateImageSize(prof["signatureurl"])
            .then((result) => {
                if(prof["name"] == "" || prof["signatureurl"] == ""){
                    setAlertPost({on:true,state:false,msg:"Insira dados válidos!"})
                } else if(result == false){
                    setAlertPost({on:true,state:false,msg:"Insira um link de imagem válido! (Google Drive, 700x200)"})
                } else{
                    console.log("validação: ")
                    console.log(result)
                    updateProfessor()
                }
            })
            .catch((err)=>{
                console.log(err)
                authCheck(err,setDenyAcess)
            })
        
    }

    const deleteProfessor = () => {
            services.deleteProfessor(prof["cpf"])
                .then((response)=>{
                    console.log("Professor removido!")
                    setProf({cpf:"",name:"",signatureurl:""})
                    getProfessorOptions()
                    setConfirming(false)
                    setAlertPost({on:true,state:true,msg:"Professor removido com sucesso!"})
                })
                .catch((err)=>{
                    console.log(err)
                    if(authCheck(err,setDenyAcess) == false){
                        setAlertPost({on:true,state:false,msg:"Selecione um professor válido!"})
                        setConfirming(false)
                        console.log(err)
                    }
                })
        }

    
    return(
        <div className="text-left lg:w-1/2 md:w-full p-4 mx-auto text-center border">
            <div>
                <h1 className="font-bold">Editar Professor no sistema</h1>
                <label htmlFor="professors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selecione uma opção</label>
                <select id="professors" value={prof["cpf"]} onChange={onChangeProfessorSelect} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {professorHtml}
                </select>
            </div>
            {prof["cpf"] != "" &&
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div>
                    <h1 className="font-bold">CPF:{prof["cpf"]}</h1></div>
                <div>
                    <h1 className="font-bold">Nome:</h1>
                    <input
                    type="text"
                    className="border border-gray-300 rounded-l px-2 py-1 w-4/5"
                    placeholder="Nome do Professor"
                    value={prof["name"]}
                    onChange={onChangeNewName}
                    />
                </div>
                <div>
                    <h1 className="font-bold">URL da Imagem da assinatura (700x200):</h1>
                    <input
                    type="text"
                    className="border border-gray-300 rounded-l px-2 py-1 w-4/5"
                    placeholder="URL da assinatura do professor"
                    value={prof["signatureurl"]}
                    onChange={onChangeNewUrl}
                    />
                </div>
                <div className="text-left p-4 mx-auto text-center">
                    <button 
                    type="button" 
                    className="bg-green-500 text-white px-4 py-1 rounded" 
                    onClick={() => {updateProfessorCheck()}}>
                    Atualizar
                    </button>
                    {!confirming ? (
                <div className="text-left p-4 mx-auto text-center">
                    <button 
                        type="button" 
                        className="bg-blue-500 text-white px-4 py-1 rounded" 
                        onClick={() => {setConfirming(true)}}>
                        Apagar
                    </button>
                </div>
                ) : (
                <div className="text-left p-4 mx-auto text-center">    
                    <button 
                        type="button" 
                        className="bg-red-500 text-white px-4 py-1 rounded" 
                        onClick={() => {deleteProfessor()}}>
                        Confirmar Apagamento
                    </button>
                    <button 
                        type="button" 
                        className="bg-blue-500 text-white px-4 py-1 rounded" 
                        onClick={() => {setConfirming(false)}}>
                        Cancelar
                    </button>
                </div>
                )}
                </div>
            </form>}
            <Alert alertObj={alertPost} alert={alertPost["on"]} setAlert={setAlertOn}/>
        </div>
    )
}