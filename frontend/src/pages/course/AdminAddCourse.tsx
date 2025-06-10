import React, {useEffect ,useState} from "react";
import { Link} from "react-router-dom";
import services from '../../services/services.js'
import Alert from "../../models/Alert.js";
import GetOptions from "../../models/GetOptions.js";
import BackButton from "../../models/BackButton.tsx";
import { authCheck } from "../../models/authCheck.js";

export default function AdminAddCourse({getCourseOptions,professorHtml,setDenyAcess}){

    const [alertAdd,setAlertAdd] = useState({on:false,state:false,msg:""})
    const [newCourseName,setNewCourseName] = useState("")
    const [newCourseHours,setNewCourseHours] = useState(0)
    const [newCourseProfCpf,setNewCourseProfCpf] = useState("")
    const onChangeNewCourseName = (e) =>{setNewCourseName(e.target.value)}
    const onChangeNewCourseHours = (e) =>{
        var num = parseInt(e.target.value)
        if(!isNaN(num)){
            setNewCourseHours(num)
        }
    }
    const onChangeNewCourseProfCpf = (e) =>{setNewCourseProfCpf(e.target.value)}

    
    const postNewCourse = () => {
        var obj = {name:newCourseName,hours:newCourseHours} //Criar uma senha com base na qtd
        if(newCourseProfCpf != ""){
            obj["secondprofcpf"] = newCourseProfCpf
        }
        if(newCourseName != "" && !isNaN(newCourseHours)){
            services.postCourse(obj)
            .then((response)=>{
                getCourseOptions()
                setAlertAdd({on:true,state:true,msg:"Curso adicionado com sucesso!"})
            })
            .catch((err)=>{
                authCheck(err,setDenyAcess)
            })
        } else{
            setAlertAdd({on:true,state:false,msg:"Preencha os campos com dados válidos!"})
        }
        
    }
    const setAlertOn = (on) => {
        setAlertAdd({on:on,state:alertAdd["state"],msg:alertAdd["msg"]})
    }

    return(
<div>
    <div className="text-left lg:w-1/2 md:w-full p-4 mx-auto text-center border">
        <BackButton to="/admin"/>
        <h1 className="font-bold">Adicionar Curso ao sistema</h1>
        <form className="max-w-sm mx-auto">
            <h1 className="font-bold">Nome do curso:</h1>
            <input
                type="text"
                className="border border-gray-300 rounded-l px-2 py-1 w-4/5"
                placeholder="Nome do Curso"
                value={newCourseName}
                onChange={onChangeNewCourseName}
            />
            <h1 className="font-bold">Quantidade de horas do curso:</h1>
            <input
                type="number"
                className="border border-gray-300 rounded-l px-2 py-1 w-4/5"
                placeholder="Quantidade de horas do Curso"
                value={newCourseHours}
                onChange={onChangeNewCourseHours}
            />
            
            <label htmlFor="professors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selecione uma opção</label>
            <h1 className="font-bold">Professor adicional:</h1>
            <select id="professors" defaultValue={""} onChange={onChangeNewCourseProfCpf} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {professorHtml}
            </select>
            <button 
                type="button"
                className="bg-blue-500 text-white px-4 py-1 rounded-r"
                onClick={() => (postNewCourse())}
            >
            Adicionar
            </button>
        </form>
        <Alert alertObj={alertAdd} alert={alertAdd["on"]} setAlert={setAlertOn}/>
    </div>
</div>



    )
}