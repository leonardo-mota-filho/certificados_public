import React, {useEffect ,useState} from "react";
import { Link, useNavigate} from "react-router-dom";
import services from '../services/services.js'
import GetOptions from '../models/GetOptions.js'
import Alert from "../models/Alert.js";
import validateCpf from "../models/CpfVerifier.js";
import BackButton from "../models/BackButton.tsx";
import { authCheck } from "../models/authCheck.js";

export default function AdminAddStudent(){
    const [denyAcess,setDenyAcess] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        if(denyAcess){
            navigate('/adminLogin')
        }
    },[denyAcess])
    const [soloAlert,setSoloAlert] = useState(false)
    const [sharedAlert,setSharedAlert] = useState(false)
    const [soloAlertObj,setSoloAlertObj] = useState({state:false,msg:""})
    const [sharedAlertObj,setSharedAlertObj] = useState({state:false,msg:""})
    const [coursesHtml,setCoursesHtml] = useState([<option key={-1} defaultValue={""}>Nenhum</option>])
    const [classesHtml,setClassesHtml] = useState([<option key={-1} defaultValue={""}>Nenhuma</option>])
    const [classesHtmlShared,setClassesHtmlShared] = useState([<option key={-1} defaultValue={""}>Nenhuma</option>])
    useEffect(() => {getCourseOptions()}, []);
    const [newStudentCpf,setNewStudentCpf] = useState("")
    const [newStudentName,setNewStudentName] = useState("")
    const [newStudentEmail,setNewStudentEmail] = useState("")
    const [newStudentPhone,setNewStudentPhone] = useState("")
    const [newStudentCourse,setNewStudentCourse] = useState(-1)
    const [newStudentClass,setNewStudentClass] = useState("")
    const [spreadsheetLink,setSpreadsheetLink] = useState("")
    const [newStudentCourseShared,setNewStudentCourseShared] = useState(-1)
    const [newStudentClassShared,setNewStudentClassShared] = useState("")
    const onChangeNewStudentCpf = (e) => {setNewStudentCpf(e.target.value)}
    const onChangeNewStudentName = (e) => {setNewStudentName(e.target.value)}
    const onChangeNewStudentEmail = (e) => {setNewStudentEmail(e.target.value)}
    const onChangeNewStudentPhone = (e) => {setNewStudentPhone(e.target.value)}
    const onChangeNewStudentCourse = (e) => {
        setNewStudentCourse(e.target.value)
        setNewStudentClass("")
        getClassOptions(false,e.target.value)
    }
    const onChangeNewStudentClass = (e) => {setNewStudentClass(e.target.value)}
    const onChangeNewStudentCourseShared = (e) => {
        setNewStudentCourseShared(e.target.value)
        setNewStudentClassShared("")
        getClassOptions(true,e.target.value)
    }
    const onChangeNewStudentClassShared = (e) => {setNewStudentClassShared(e.target.value)}
    const onChangeSpreadsheetLink = (e) => {setSpreadsheetLink(e.target.value)}

    const getClassOptions = (shared,course) => {
        if(shared){
            GetOptions["getClassOptions"](course,setClassesHtmlShared,setDenyAcess)
        } else{
            GetOptions["getClassOptions"](course,setClassesHtml,setDenyAcess)
        }
    }

    const getCourseOptions = () =>{GetOptions["getCourseOptions"](setCoursesHtml,setDenyAcess)}

    const postNewStudent = (studentCpf,studentName,studentEmail,studentPhone,studentClass) =>{
        if(studentCpf == "" || studentName == "" || studentEmail == "" || studentPhone == "" || studentClass == ""){
        } else {
            services.postStudent({cpf:studentCpf,name:studentName,email:studentEmail,phone:studentPhone})
                .then((response) => {
                    console.log(response)
                    services.postStudentInClass({scpf:studentCpf,classid:studentClass})
                    .then((response) => {
                        console.log(response)
                        services.postCertificate({scpf:studentCpf,classid:studentClass,isavailable:false})
                            .then((response) => {console.log(response)})})})
            .catch((err)=>{
                authCheck(err,denyAcess)
            })
        }
        
    }

    const postNewStudentShared = () => {
        var encodedLink = spreadsheetLink
        for(var i=0;i<encodedLink.length;i++){
            if(encodedLink[i] == '/'){
                encodedLink = encodedLink.replace('/','*')
            }            
        }
        if(newStudentClassShared == "" || newStudentCourseShared == -1) {
            setAlert("Selecione todos os campos!",false,true)
        } else{
            services.getStudentsFromSheet(encodedLink)
                .then((response)=>{
                    var errors = Array()
                    response.data.forEach(student=> {
                        if(student["CPF"] == "" || student["Nome Completo"] == "" || student["E-mail"] == "" || student["Telefone/Whatsapp"] == ""){
                            errors.push(`Estudante ${student["CPF"]}: Algum dos campos está vazio!`)
                        } else if (!validateCpf(student["CPF"])){
                            errors.push(`Estudante ${student["CPF"]}: CPF Inválido!`)
                        } else if (response.data.some(s => s["CPF"] === student["CPF"] && s != student)){
                            errors.push(`Estudante ${student["CPF"]} (${student["Nome Completo"]}): CPF Duplicado!`)
                        } else{
                            postNewStudent(student["CPF"],student["Nome Completo"],student["E-mail"],student["Telefone/Whatsapp"],newStudentClassShared)
                        }
                    });
                    if(errors.length == 0){
                        setAlert("Estudantes adicionados com sucesso!",true,true)
                    } else{
                        setAlert("Alguns estudantes não foram adicionados:\n" + errors.join('\n'),false,true)
                    }
                    console.log(response.data)
                })
            .catch((err) => {
                if(authCheck(err,setDenyAcess) == false){
                    setAlert("Não foi possível acessar o link.",false,true)
                }
            })
        }
    }

    const postNewStudentSolo = () => {
        if(newStudentCpf == "" || newStudentName == "" || newStudentEmail == "" || newStudentPhone == "" || newStudentClass == ""){
            setAlert("Preencha todos os campos!",false,false)
        } else if (!validateCpf(newStudentCpf)){
            setAlert("Insira um CPF válido!",false,false)
        } else{
            postNewStudent(newStudentCpf,newStudentName,newStudentEmail,newStudentPhone,newStudentClass)
            setAlert("Estudante inserido com sucesso!",true,false)
        }

    }

    const setAlert = (msg,state,shared) =>{
        if(shared){
            setSharedAlertObj({state:state,msg:msg})
            setSharedAlert(true)
        } else{
            setSoloAlertObj({state:state,msg:msg})
            setSoloAlert(true)
        }
    }


    return(
<div>
    <div className="text-left lg:w-1/2 md:w-full p-4 mx-auto text-center border">
        <BackButton to="/admin"/>
        <h1 className="font-bold">Adicionar estudante individual</h1>
        <form className="max-w-sm mx-auto">
            <h1 className="font-bold">CPF do estudante:</h1>
            <input
                type="text"
                className="border border-gray-300 rounded-l px-2 py-1 w-4/5"
                placeholder="Cpf do Estudante"
                value={newStudentCpf}
                onChange={onChangeNewStudentCpf}
            />
            <h1 className="font-bold">Nome do estudante:</h1>
            <input
                type="text"
                className="border border-gray-300 rounded-l px-2 py-1 w-4/5"
                placeholder="Nome do Estudante"
                value={newStudentName}
                onChange={onChangeNewStudentName}
            />
            <h1 className="font-bold">E-mail do estudante:</h1>
            <input
                type="text"
                className="border border-gray-300 rounded-l px-2 py-1 w-4/5"
                placeholder="E-mail do Estudante"
                value={newStudentEmail}
                onChange={onChangeNewStudentEmail}
            />
            <h1 className="font-bold">Telefone do estudante:</h1>
            <input
                type="text"
                className="border border-gray-300 rounded-l px-2 py-1 w-4/5"
                placeholder="Telefone do Estudante"
                value={newStudentPhone}
                onChange={onChangeNewStudentPhone}
            />
            <label htmlFor="courses" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selecione uma opção</label>
            <h1 className="font-bold">Curso:</h1>
            <select id="courses" defaultValue={""} onChange={onChangeNewStudentCourse} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {coursesHtml}
            </select>
            <label htmlFor="classes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selecione uma opção</label>
            <h1 className="font-bold">Turma:</h1>
            <select id="classes" defaultValue={""} onChange={onChangeNewStudentClass} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {classesHtml}
            </select>
            <button 
                type="button"
                className="bg-blue-500 text-white px-4 py-1 rounded-r"
                onClick={() => (postNewStudentSolo())}
            >
            Adicionar
            </button>
            <div>
                <Alert alertObj={soloAlertObj} alert={soloAlert} setAlert={setSoloAlert}/>
            </div>
        </form>
    </div>
     <div className="text-left lg:w-1/2 md:w-full p-4 mx-auto text-center border">
        <h1 className="font-bold">Adicionar estudante via google spreadsheets</h1>
        <form className="max-w-sm mx-auto">
            <input
                type="text"
                className="border border-gray-300 rounded-l px-2 py-1 w-4/5"
                placeholder="Link de compartilhamento da planilha"
                value={spreadsheetLink}
                onChange={onChangeSpreadsheetLink}
            />
            <label htmlFor="courses" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selecione uma opção</label>
            <h1 className="font-bold">Curso:</h1>
            <select id="courses" defaultValue={""} onChange={onChangeNewStudentCourseShared} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {coursesHtml}
            </select>
            <label htmlFor="classes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selecione uma opção</label>
            <h1 className="font-bold">Turma:</h1>
            <select id="classes" defaultValue={""} onChange={onChangeNewStudentClassShared} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {classesHtmlShared}
            </select>
            <button 
                type="button"
                className="bg-blue-500 text-white px-4 py-1 rounded-r"
                onClick={() => (postNewStudentShared())}
            >
            Adicionar
            </button>
            <Alert alertObj={sharedAlertObj} alert={sharedAlert} setAlert={setSharedAlert}/>
        </form>
    </div>
</div>
    )
}