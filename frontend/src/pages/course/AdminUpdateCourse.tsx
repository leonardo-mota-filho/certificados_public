import React, {useEffect ,useState} from "react";
import { Link} from "react-router-dom";
import services from '../../services/services.js'
import Alert from "../../models/Alert.js";
import { authCheck } from "../../models/authCheck.js";

export default function AdminUpdateCourse({getCourseOptions,professorHtml,courseHtml,setDenyAcess}){
    const [alertPost,setAlertPost] = useState({on:false,state:false,msg:""})
    const [course,setCourse] = useState({id:-1,name:"",hours:0,secondprofcpf:""})
    const [confirming,setConfirming] = useState(false)
    const onChangeCourseSelect = (e) => {
        setCourse({id:e.target.value,name:course["name"],hours:course["hours"],secondprofcpf:course["secondprofcpf"]})
        services.getCourseById(e.target.value)
            .then((response) => {
                console.log(response)
                setCourse({id:e.target.value,name:response.data[0]["name"],hours:response.data[0]["hours"],secondprofcpf:(response.data[0]["secondprofcpf"] == null ? "":response.data[0]["secondprofcpf"])})
            })
            .catch((err)=>{
                if(authCheck(err,setDenyAcess) == false){
                    setCourse({id:-1,name:"",hours:0,secondprofcpf:""})
                    setAlertPost({on:true,state:false,msg:"Selecione um curso válido!"})
                }
            })
    }
    const onChangeNewCourseName = (e) => {setCourse({id:course["id"],name:e.target.value,hours:course["hours"],secondprofcpf:course["secondprofcpf"]})}
    const onChangeNewCourseHours = (e) => {setCourse({id:course["id"],name:course["name"],hours:e.target.value,secondprofcpf:course["secondprofcpf"]})}
    const onChangeProfessorSelect = (e) => {setCourse({id:course["id"],name:course["name"],hours:course["hours"],secondprofcpf:e.target.value}),console.log(e.target.value)}
    const setAlertOn = (on) => {
        setAlertPost({on:on,state:alertPost["state"],msg:alertPost["msg"]})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateCourseCheck()
    }

    const updateCourseCheck = () => {
        if(course["name"] == ""){
            setAlertOn({on:true,state:false,msg:"Insira um nome válidos"})
        } else{
            updateCourse()
        }
    }

    const updateCourse = () => {
        var prof = course["secondprofcpf"] == "" ? null : course["secondprofcpf"]
        services.updateCourse({id:course["id"],name:course["name"],hours:course["hours"],secondprofcpf:prof})
            .then((response)=>{
                console.log(response)
                setAlertPost({on:true,state:true,msg:"Curso atualizado com sucesso!"})
                getCourseOptions()
            })
            .catch((err)=>{
                authCheck(err,setDenyAcess)
            })
    }

    const deleteCourse = () => {
            services.deleteCourse(course["id"])
                .then((response) => {
                    console.log("DELETADO")
                    setCourse({id:-1,name:"",hours:0,secondprofcpf:""})
                    getCourseOptions()
                    setConfirming(false)
                    setAlertPost({on:true,state:true,msg:"Curso apagado com sucesso!"})
                })
                .catch((err) => {
                    if(authCheck(err,setDenyAcess) == false){
                        setAlertPost({on:true,state:false,msg:"Selecione um curso válido!"})
                        setConfirming(false)
                    }
                    
                })
    }

    return(
        <div className="text-left lg:w-1/2 md:w-full p-4 mx-auto text-center border">
                    <div>
                        <h1 className="font-bold">Editar Curso no sistema</h1>
                        <label htmlFor="professors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selecione uma opção</label>
                        <select id="professors" value={course["id"]} onChange={onChangeCourseSelect} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {courseHtml}
                        </select>
                    </div>
                    {course["id"] != -1 &&
                    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                        <div>
                            <h1 className="font-bold">ID:{course["id"]}</h1></div>
                        <div>
                            <h1 className="font-bold">Nome:</h1>
                            <input
                            type="text"
                            className="border border-gray-300 rounded-l px-2 py-1 w-4/5"
                            placeholder="Nome do Professor"
                            value={course["name"]}
                            onChange={onChangeNewCourseName}
                            />
                        </div>
                        <div>
                            <h1 className="font-bold">Horas:</h1>
                            <input
                            type="number"
                            className="border border-gray-300 rounded-l px-2 py-1 w-4/5"
                            placeholder="URL da assinatura do professor"
                            value={course["hours"]}
                            onChange={onChangeNewCourseHours}
                            />
                        </div>
                        <div>
                            <h1 className="font-bold">Segundo professor:</h1>
                            <select id="professors" value={course["secondprofcpf"]} onChange={onChangeProfessorSelect} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {professorHtml}
                            </select>
                        </div>
                        <div className="text-left p-4 mx-auto text-center">
                            <button 
                            type="button" 
                            className="bg-green-500 text-white px-4 py-1 rounded" 
                            onClick={() => {updateCourseCheck()}}>
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
                                onClick={() => {deleteCourse()}}>
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