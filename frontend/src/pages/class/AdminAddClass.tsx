import React, {useEffect ,useState} from "react";
import { Link} from "react-router-dom";
import services from '../../services/services.js'
import Alert from "../../models/Alert.js";
import BackButton from "../../models/BackButton.tsx";
import { generateRollCall } from "../../models/rollcallpws.js";
import { authCheck } from "../../models/authCheck.js";

export default function AdminAddClass({getClassOptions,coursesHtml,setDenyAcess}){
    const [alertAdd,setAlertAdd] = useState({on:false,state:false,msg:""})
    const [newClassContent,setNewClassContent] = useState("")
    const [newClassPeriod,setNewClassPeriod] = useState("")
    const [newClassCourse,setNewClassCourse] = useState("")
    const [newRollCallQtd,setNewRollCallQtd] = useState(0)
    const onChangeNewClassContent = (e) => {setNewClassContent(e.target.value)}
    const onChangeNewClassPeriod= (e) => {setNewClassPeriod(e.target.value)}
    const onChangeNewClassCourse = (e) => {setNewClassCourse(e.target.value)}
    const onChangeNewRollCallQtd = (e) =>{setNewRollCallQtd(e.target.value)}
    const postNewClass = () => {
        var newPwd = generateRollCall(newRollCallQtd)
        services.postClass({content:newClassContent,period:newClassPeriod,courseid:newClassCourse,rollcallqtd:newRollCallQtd,rollcallpw:newPwd})
            .then((response) => {
                getClassOptions(newClassCourse)
                setAlertAdd({on:true,state:true,msg:"Turma inserida com sucesso!\nConsulte os links na aba de edição da turma."})
            })
            .catch((err)=>{
                authCheck(err,setDenyAcess)
            })
    }
    const setAlertOn = (on) => {
        setAlertAdd({on:on,state:alertAdd["state"],msg:alertAdd["msg"]})
    }

    return(
<div>
    <div className="text-left lg:w-1/2 md:w-full p-4 mx-auto text-center border">
        <BackButton to="/admin"/>
        <h1 className="font-bold">Adicionar Turma no sistema</h1>
        <form className="max-w-sm mx-auto">
            <h1 className="font-bold">Conteúdo (Utilize * para quebra de linha):</h1>
            <input
                type="text"
                className="border border-gray-300 rounded-l px-2 py-1 w-4/5"
                placeholder="Conteúdo da Turma"
                value={newClassContent}
                onChange={onChangeNewClassContent}
            />
            <h1 className="font-bold">Período:</h1>
            <input
                type="text"
                className="border border-gray-300 rounded-l px-2 py-1 w-4/5"
                placeholder="Período da Turma"
                value={newClassPeriod}
                onChange={onChangeNewClassPeriod}
            />
            <h1 className="font-bold">Quantidade de frequências:</h1>
            <input
                type="number"
                className="border border-gray-300 rounded-l px-2 py-1 w-4/5"
                placeholder="Quantidade de frequências do Curso"
                value={newRollCallQtd}
                onChange={onChangeNewRollCallQtd}
            />
            <label htmlFor="courses" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selecione uma opção</label>
            <h1 className="font-bold">Curso da nova turma:</h1>
            <select id="courses" defaultValue={""} onChange={onChangeNewClassCourse} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {coursesHtml}
            </select>
            <button 
                type="button"
                className="bg-blue-500 text-white px-4 py-1 rounded"
                onClick={() => (postNewClass())}
            >
            Adicionar
            </button>
        </form>
        <Alert alertObj={alertAdd} alert={alertAdd["on"]} setAlert={setAlertOn}/>
    </div>
</div>
    )
}