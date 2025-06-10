import React, {useEffect ,useState} from "react";
import { Link} from "react-router-dom";
import services from '../../services/services.js'
import Alert from "../../models/Alert.js";
import { authCheck } from "../../models/authCheck.js";

export default function AdminUpdateClass({getClassOptions,classesHtml,coursesHtml,setDenyAcess}){
    const [alert,setAlert] = useState({on:false,state:false,msg:""})
    const [classObj,setClassObj] = useState({id:"",content:"",period:"",courseid:-1,rollcallqtd:0,rollcalllinks:[<div></div>]})
    const [confirming,setConfirming] = useState(false)
    const onChangeCourse = (e) =>{setClassObj({id:"",content:"",period:"",courseid:e.target.value,rollcallqtd:0,rollcalllinks:[<div></div>]}),getClassOptions(e.target.value)}
    const onChangeClass = (e) =>{
        setClassObj({id:e.target.value,content:classObj["content"],period:classObj["period"],courseid:classObj["courseid"],rollcallqtd:classObj["rollcallqtd"],rollcalllinks:classObj["rollcallinks"]})
        services.getClassById(e.target.value)
            .then((response)=>{
                console.log(response)
                var links = new Array()
                for(var i=0;i<response.data[0]["rollcallqtd"];i++){
                    links.push(<Link className="text-blue-800" to={`/rollcall/${response.data[0]["id"]}/${response.data[0]["rollcallpw"].split(';')[i]}`} key={i}>{`Frequência ${i+1}: ${window.location.origin}/rollcall/${response.data[0]["id"]}/${response.data[0]["rollcallpw"].split(';')[i]}`}</Link>) 
                    links.push(<br key={i + 'b'}/>)
                }
                setClassObj({id:e.target.value,content:response.data[0]["content"],period:response.data[0]["period"],courseid:classObj["courseid"],rollcallqtd:response.data[0]["rollcallqtd"],rollcalllinks:links})
            })
            .catch((err)=>{
                if(authCheck(err,setDenyAcess) == false){
                    setClassObj({id:"",content:"",period:"",courseid:-1,rollcallqtd:0,rollcalllinks:[<div></div>]})
                    setAlert({on:true,state:false,msg:"Selecione uma turma válida!"})
                }
            })
    }
    const onChangeContent = (e) => {setClassObj({id:classObj["id"],content:e.target.value,period:classObj["period"],courseid:classObj["courseid"],rollcallqtd:classObj["rollcallqtd"],rollcalllinks:classObj["rollcallinks"]})}
    const onChangePeriod = (e) => {setClassObj({id:classObj["id"],content:classObj["content"],period:e.target.value,courseid:classObj["courseid"],rollcallqtd:classObj["rollcallqtd"],rollcalllinks:classObj["rollcallinks"]})}

    const setAlertOn = (on) => {
        setAlert({on:on,state:alert["state"],msg:alert["msg"]})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateClassCheck()
    }

    const updateClassCheck = () => {
        if(classObj["content"] == "" || classObj["period"] == ""){
            setAlert({on:true,state:false,msg:"Insira informações válidas!"})
        } else{
            updateClass()
        }
    }

    const updateClass = () => {
        services.updateClass({id:classObj["id"],content:classObj["content"],period:classObj["period"]})
            .then((response)=>{
                console.log(response)
                setAlert({on:true,state:true,msg:"Turma adicionada com sucesso!"})
                getClassOptions(classObj["courseid"])
            })
            .catch((err)=>{
                authCheck(err,setDenyAcess)
            })
    }

    const deleteClass = () => {
            services.deleteClass(classObj["id"])
                .then((response)=>{
                    setClassObj({id:"",content:"",period:"",courseid:classObj["courseid"],rollcallqtd:0,rollcalllinks:[<div></div>]})
                    getClassOptions(classObj["courseid"])
                    setConfirming(false)
                    setAlert({on:true,state:true,msg:"Turma removida com sucesso!"})
                })
                .catch((err)=>{
                    if(authCheck(err,setDenyAcess) == false){
                        setConfirming(false)
                        setAlert({on:true,state:false,msg:"Turma selecionada é inválida!"})
                    }
                })
    }

    return(
        <div>
            <div className="text-left lg:w-1/2 md:w-full p-4 mx-auto text-center border">
                <h1 className="font-bold">Editar Turma no sistema</h1>
                <label htmlFor="courses" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selecione uma opção</label>
                <h1 className="font-bold">Curso:</h1>
                <select id="courses" defaultValue={classObj["courseid"]} onChange={onChangeCourse} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {coursesHtml}
                </select>
                <label htmlFor="classes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selecione uma opção</label>
                <h1 className="font-bold">Turma:</h1>
                <select id="classes" value={classObj["id"]} onChange={onChangeClass} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {classesHtml}
                </select>
                {classObj["id"] != "" &&
                    <form className="max-w-lg mx-auto relative" onSubmit={handleSubmit}>
                        <div><h1 className="font-bold">ID:{classObj["id"]}</h1></div>
                        <div><h1 className="font-bold">Qtd de Frequências:{classObj["rollcallqtd"]}</h1></div>
                        <div><h1 className="font-bold">Links de Frequências:</h1></div>
                        <div className="border">{classObj["rollcalllinks"]}</div>
                        <div>
                            <h1 className="font-bold">Conteúdo:</h1>
                            <input
                            type="text"
                            className="border border-gray-300 rounded-l px-2 py-1 w-4/5"
                            placeholder="Conteúdo da turma"
                            value={classObj["content"]}
                            onChange={onChangeContent}
                            />
                        </div>
                        <div>
                            <h1 className="font-bold">Período:</h1>
                            <input
                            type="text"
                            className="border border-gray-300 rounded-l px-2 py-1 w-4/5"
                            placeholder="Período da turma"
                            value={classObj["period"]}
                            onChange={onChangePeriod}
                            />
                        </div>
                        <div className="text-left p-4 mx-auto text-center">
                            <button 
                            type="button" 
                            className="bg-green-500 text-white px-4 py-1 rounded" 
                            onClick={() => {updateClassCheck()}}>
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
                    onClick={() => {deleteClass()}}>
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
                <Alert alertObj={alert} alert={alert["on"]} setAlert={setAlertOn}/>
            </div>
        </div>
    )
}