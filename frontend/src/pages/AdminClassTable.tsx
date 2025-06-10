import React, {useEffect ,useRef,useState} from "react";
import { Link, useNavigate} from "react-router-dom";
import GetOptions from "../models/GetOptions.js";
import services from '../services/services.js'
import Alert from "../models/Alert.js";
import {generatePdf, generateSinglePdf} from "../models/generatePdf.js";
import reloadGif from "../assets/reload.gif"
import BackButton from "../models/BackButton.tsx";
import {QRCodeSVG} from 'qrcode.react';
import * as htmlToImage from 'html-to-image';
import { authCheck } from "../models/authCheck.js";
export default function AdminClassTable(){
    const [denyAcess,setDenyAcess] = useState(false)
        const navigate = useNavigate()
        useEffect(()=>{
            if(denyAcess){
                navigate('/adminLogin')
            }
        },[denyAcess])
    const [alert,setAlert] = useState({on:false,state:false,msg:""})
    const [table,setTable] = useState([<div></div>])
    const [rollCallTable,setRollCallTable] = useState([<div key={0}></div>])
    const [rollCalls,setRolllCalls] = useState({})
    const [showTable,setShowTable] = useState(false)
    const [showButtons,setShowButtons] = useState(false)
    const [students,setStudents] = useState(new Array())
    const [toRemove,setToRemove] = useState(new Array())
    const [loading,setLoading] = useState(false)
    const [coursesHtml,setCoursesHtml] = useState([<option key={-1} defaultValue={""}>Nenhum</option>])
    const [classesHtml,setClassesHtml] = useState([<option key={-1} defaultValue={""}>Nenhuma</option>])
    const [selectedCourse,setSelectedCourse] = useState(-1)
    const [selectedClass,setSelectedClass] = useState("")
    const [classInfo,setClassInfo] = useState({rollcallqtd:0,rollcalllinks:[<div></div>],rollcalllinkstxt:new Array()})
    const [listCheck, setListCheck] = useState(new Array())
    const [checkIds,setCheckIds] = useState(new Array())
    const [qrcode,setQrcode] = useState({link:"",text:""})

    useEffect(() => {getCourseOptions()}, []);

    useEffect(() => {mountGeneralTable()},[students,listCheck])

    useEffect(() => {mountRollCallTable()},[students,classInfo])

    useEffect(() => {getClassInfo()},[selectedClass])

    const setAllChecks = (e) => {
        setListCheck(e.target.checked ? checkIds : [])
    }

    const setCheck = (e) => {
        const checkedId = e.target.value;
        if(e.target.checked){
            setListCheck([...listCheck,checkedId])
        }else{
            setListCheck(listCheck.filter(id=>id !== checkedId))
        }
    }

    const setAlertOn = (on) => {
        setAlert({on:on,state:alert["state"],msg:alert["msg"]})
    }

    const onChangeNewStudentClass = (e) => {setSelectedClass(e.target.value),setShowTable(false),setShowButtons(false),setAlertOn(false),updateStudents(e.target.value)}
    const onChangeNewStudentCourse = (e) => {
        setSelectedCourse(e.target.value)
        setShowTable(false)
        setShowButtons(false)
        setAlertOn(false)
        setSelectedClass("")
        getClassOptions(e.target.value)
    }

    const getClassInfo = () => {
        if(selectedClass != "" && selectedClass != null){
            services.getClassById(selectedClass)
            .then((response)=>{
                var links = new Array()
                var linksTxt = new Array()
                for(var i=0;i<response.data[0]["rollcallqtd"];i++){
                    var link = `/rollcall/${response.data[0]["id"]}/${response.data[0]["rollcallpw"].split(';')[i]}`
                    links.push(<Link className="text-blue-800" to={link} key={(i+1)*-1}>{`Frequência ${i+1}: ${window.location.origin}${link}`}</Link>)
                    linksTxt.push(`${window.location.origin}${link}`)
                    links.push(<button type="button" key={i} value={`${i}`} className="cursor-pointer" onClick={e => {setQrCodeData(e,linksTxt)}}>
                        <svg key={0} className="w-6 h-6 text-gray-800 dark:text-white my-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path key={0} stroke="black" strokeLinejoin="round" strokeWidth="2" d="M4 4h6v6H4V4Zm10 10h6v6h-6v-6Zm0-10h6v6h-6V4Zm-4 10h.01v.01H10V14Zm0 4h.01v.01H10V18Zm-3 2h.01v.01H7V20Zm0-4h.01v.01H7V16Zm-3 2h.01v.01H4V18Zm0-4h.01v.01H4V14Z"/>
                            <path key={1} stroke="black" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01v.01H7V7Zm10 10h.01v.01H17V17Z"/>
                        </svg>
                    </button>)
                    links.push(<br key={i + 'b'}/>)
                }
                setQrcode({link:"",text:""})
                setClassInfo({rollcallqtd:response.data[0]["rollcallqtd"],rollcalllinks:links,rollcalllinkstxt:linksTxt})
            })
            .catch((err)=>{
                authCheck(err,setDenyAcess)
            })
        }
    }
    const setQrCodeData = (e,linksTxt) => {
        console.log(e)
        console.log(linksTxt)
        setQrcode({link: linksTxt[parseInt(e.currentTarget.value)],text:`Frequência ${parseInt(e.currentTarget.value) + 1}`})
    }

    const getClassOptions = (course) => {GetOptions["getClassOptions"](course,setClassesHtml,setDenyAcess)}

    const getCourseOptions = () =>{GetOptions["getCourseOptions"](setCoursesHtml,setDenyAcess)}
    
    const generateOnePdf = (e) => {
        generateSinglePdf(students[e.target.value],selectedClass,setLoading)
    }

    const updateStudents = (sclass) => {
        setToRemove([])
        if(selectedCourse != -1 && sclass != ""){
            services.getStudentsOfClass(sclass)
            .then((response) => {
                var lcheck = new Array()
                for(var i=0;i<response.data.length;i++) {
                    if(response.data[i]["isavailable"]){ 
                        lcheck.push(`${i}`)
                    }
                }
                services.getRollCallOfClass(sclass)
                    .then((response2)=>{
                        var rcs = {}
                        console.log(response2)
                        response2.data.forEach(rc => {
                            rcs[rc["scpf"]] = rc["rollcallids"]
                        });
                        setRolllCalls(rcs)
                        setListCheck(lcheck)
                        setStudents(response.data)
                    })
                
            })
            .catch((err) => authCheck(err,setDenyAcess))
        } else{
            console.log("reset")
            setTable([<div key={-1}></div>])
            setShowTable(false)
            setShowButtons(false)
            setAlertOn(false)
        }
    }

    const mountGeneralTable = () => {
        //Head da table com os valores definidos
        if(students.length > 0){
            var values = ["CPF","Nome","E-mail","Tel.","Ativar Cert.","Baixar","Editar","R."]
            var head : React.JSX.Element[] = []
            for(var i=0;i<values.length;i++) {
                head.push(<th key={i}>{values[i]}</th>)
            };
            var thead : React.JSX.Element[] = []
            thead.push(<thead key={0}><tr key={-1} className="px-4 py-3">{head}</tr></thead>)

            //Elementos da table (tbody)
            var trs : React.JSX.Element[] = []
            var ids = new Array()
            for(var i=0;i<students.length;i++) {
                trs.push(
                    <tr key={i+1} className="bg-white border border-gray-200">
                        <td className="px-4 py-4">{students[i]["scpf"]}</td>
                        <td className="px-4 py-4">{students[i]["name"]}</td>
                        <td className="px-4 py-4">{students[i]["email"]}</td>
                        <td className="px-4 py-4">{students[i]["phone"]}</td>
                        <td className="px-4 py-4"><input value={i} type="checkbox" checked={listCheck.includes(`${i}`)}  onChange={setCheck} className="checkbox hover:text-blue-500" /></td>
                        <td className="px-4 py-4"><button className="text-blue-800 hover:text-blue-500" value={i} onClick={generateOnePdf}>Baixar</button></td>
                        <td className="px-4 py-4"><Link className="text-green-800 hover:text-green-500" to={`/admin/updatestudent/${students[i]["scpf"]}`}>Editar aluno</Link></td>
                        <td className="px-4 py-4">
                                <button type="button" value={`${i}`} className={"ms-auto -mx-1.5 -my-1.5 bg-white text-red-500 rounded-lg focus:ring-2 focus:ring-gray-400 p-1.5 hover:bg-gray-300 inline-flex items-center justify-center h-8 w-8"} onClick={sendToRemoval} aria-label="Close">
                                <span className="sr-only">Close</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                        </td>
                    </tr>)
                ids.push(`${i}`)
            };
            var tablehtml : React.JSX.Element[] = []
            tablehtml.push(<table key={-1} className="w-full text-base text-left rtl:text-right">{thead}<tbody key={1}>{trs}</tbody></table>)
            setCheckIds(ids)
            setTable(tablehtml)
            setShowTable(true)
            setShowButtons(true)
        } else{
            setTable([<div key={0}></div>])
            setShowTable(false)
        }
    }

    const mountRollCallTable = () =>{
        if(students.length > 0 && classInfo["rollcallqtd"] > 0){
            //Elementos da head
            var head : React.JSX.Element[] = []
            head.push(<th key={-2}>CPF</th>)
            head.push(<th key={-1}>Nome</th>)
            for(var i=0;i<classInfo["rollcallqtd"];i++){
                head.push(<th key={i}>{`Freq ${i+1}`}</th>)
            }
            head.push(<th className="bg-gray-300" key={i}>Aprov (65%)</th>)
            var thead : React.JSX.Element[] = []
            thead.push(<thead key={0}><tr key={-1} className="px-4 py-3 ">{head}</tr></thead>)
            
            //Elementos do body (linhas)
            var negativeIcon =  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="red" strokeLinecap="round" strokeWidth="2" d="m6 6 12 12m3-6a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
            var confirmationIcon = <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="green" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                    </svg>
            var trueConfirmationIcon = <svg className="w-6 h-6 text-gray-800 dark:text-white mx-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="green" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd"/>
                                        </svg>
            var trueNegativeIcon = <svg className="w-6 h-6 text-gray-800 dark:text-white mx-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clipRule="evenodd"/>
                                    </svg>


            var trs : React.JSX.Element[] = []
            for(var j=0;j<students.length;j++){
                var tds : React.JSX.Element[] = []
                tds.push(<td key={-1} className="px-4 py-4">{students[j]["scpf"]}</td>)
                tds.push(<td key={-2} className="px-4 py-4">{students[j]["name"]}</td>)
                for(var i=0;i<classInfo["rollcallqtd"];i++){
                    if(rollCalls[students[j]["scpf"]] != null){
                        tds.push(<td key={i} className="px-4 py-4">{rollCalls[students[j]["scpf"]].split(';').includes(`${i+1}`) ? confirmationIcon : negativeIcon}</td>)
                    } else{
                        tds.push(<td key={i} className="px-4 py-4">{negativeIcon}</td>)
                    }
                }
                var presenceRate = rollCalls[students[j]["scpf"]] == undefined ? 0 : Math.round(rollCalls[students[j]["scpf"]].split(';').length/classInfo["rollcallqtd"] * 100)
                tds.push(<td key={i+1} className="px-4 py-4 bg-gray-300">{presenceRate >= 65 ? trueConfirmationIcon : trueNegativeIcon}</td>

                )
                trs.push(<tr key={j} className="bg-white border border-gray-200">{tds}</tr>)
            }
            var tablehtml : React.JSX.Element[] = []
            tablehtml.push(<table key={0} className="w-full text-base text-left rtl:text-right">{thead}<tbody key={2}>{trs}</tbody></table>)
            setRollCallTable(tablehtml)

        } else{
            setRollCallTable([<div key={0}></div>])
        }
    }

    const sendToRemoval = (e) => {
        const studentIndex = e.currentTarget.value;
        const index = parseInt(studentIndex);

        const updatedStudents = [...students];
        updatedStudents.splice(index, 1);
        setStudents(updatedStudents);

        setToRemove(prevToRemove => {
            return [...prevToRemove, students[index]];
        });

        setListCheck(prevListCheck => {
            var newList =  prevListCheck.filter(id => id !== studentIndex)
            for(var i=0;i<newList.length;i++){
                if(parseInt(newList[i]) > index){
                    newList[i] = `${parseInt(newList[i])-1}`
                }
            }
            console.log(newList)
            return newList
        });
        
    }

    const setApprovedAsMarked = () => {
        var newListCheck = new Array()
        for(var i=0;i<students.length;i++){
            var presenceRate = Math.round(rollCalls[students[i]["scpf"]].split(';').length/classInfo["rollcallqtd"] * 100)
            if(presenceRate >= 65){newListCheck.push(`${i}`)}
        }
        console.log(newListCheck)
        setListCheck(newListCheck)
    }


    const updateCertificates = () => {
        console.log("UPDATE")
        for(var i=0;i<students.length;i++) {
            var newAvailable = listCheck.includes(`${i}`)
            services.updateCertificate({cpf:students[i]["scpf"],classid:selectedClass,available:newAvailable})
                .then((response) => {
                    console.log(response)
                    setAlert({on:true,state:true,msg:"Alterações salvas com sucesso!"})
                })
                .catch((err) => {
                    authCheck(err,setDenyAcess)
                })
        }
    }

    const removeStudentsFromClass = () => {
        toRemove.forEach(student => {
            services.deleteInClass(student["scpf"],selectedClass)
                .then((response) =>{
                    console.log(response)
                    setAlert({on:true,state:true,msg:"Alterações salvas com sucesso!"})
                })
                .catch((err)=>{
                    authCheck(err,setDenyAcess)
                })
        });
    }

    const getAllowedStudents = () =>{
        var allowedStudents = new Array()
        for(var i=0;i<students.length;i++) {
            var available = listCheck.includes(`${i}`)
            if(available){
                allowedStudents.push(students[i])
            }
        }
        return allowedStudents
    }

    const generateQRImage = async () => {
        console.log("uhhhh")
        const domQR = document.getElementById('domQR')
        if(domQR != null){
            console.log("CLICK")
            const dataURL = await htmlToImage.toPng(domQR);
            const link = document.createElement('a');
            link.download = `${selectedClass}-${qrcode["text"]}.png`;
            link.href = dataURL;
            link.click();
        }
    }

    return (
    <div className="text-left lg:w-1/2 md:w-full p-4 mx-auto text-center border relative">
        <BackButton to="/admin"/>
        <h1 className="font-bold">Visualizar Turma</h1>
         <label htmlFor="courses" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selecione uma opção</label>
            <select id="courses" defaultValue={""} onChange={onChangeNewStudentCourse} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {coursesHtml}
            </select>
            <label htmlFor="classes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selecione uma opção</label>
            <select id="classes" value={selectedClass} onChange={onChangeNewStudentClass} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {classesHtml}
        </select>
        <Alert alertObj={alert} alert={alert["on"]} setAlert={setAlertOn}/>
        {showButtons && 
        <div>
            <div className="flex flex-col h-15">
                <h1 className="m-auto font-bold text-2xl">Tabela geral dos alunos</h1>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-2">
                    <button 
                        type="button" 
                        className="bg-red-500 text-white px-4 py-1 rounded mx-2" 
                        onClick={() => {updateStudents(selectedClass)}}>
                        Reiniciar Tabela
                    </button>
                    <button 
                        type="button"
                        className="bg-green-500 text-white px-4 py-1 rounded mx-2"
                        onClick={() => {updateCertificates(),removeStudentsFromClass()}}>
                        Salvar Alterações
                    </button>
                    <button 
                        type="button"
                        className="bg-blue-500 text-white px-4 py-1 rounded mx-2"
                        onClick={() => {generatePdf(getAllowedStudents(),selectedClass,setLoading)}}>
                        Baixar Certificados Habilitados
                    </button>
                    {loading && <img className="w-8 h-8 p-1 my-auto" src={reloadGif}></img>}
                    <button 
                        type="button"
                        className="bg-purple-500 text-white px-4 py-1 rounded mx-2"
                        onClick={() => {setApprovedAsMarked()}}>
                        Habilitar Aprovados
                    </button>
                    
            </div>
        </div>}
        {showTable ? (
            <div>
                <div className="overflow-x-auto">
                    <div className="grid grid-cols-10 ms-112 gap-20">
                        <h1 className="checkbox">Sel. Todos:</h1>
                        <input type="checkbox" checked={JSON.stringify(checkIds.sort()) === JSON.stringify(listCheck.sort())} onChange={setAllChecks} className="checkbox float-right my-2" />
                    </div>
                    {table}
                </div>
                
            </div>
            
        ) : (<div></div>)}
        {showTable && 
            <div>
                <div className="flex flex-col h-15">
                    <h1 className="m-auto font-bold text-2xl">Tabela de Frequência</h1>
                </div>
                <div className="overflow-x-auto">
                    {rollCallTable}
                </div>
                <br/>
                <div className="max-w-lg mx-auto relative">
                    <div className="border">{classInfo["rollcalllinks"]}</div>
                </div>
                <br/>
                {qrcode["link"]!= "" &&
                <div className="border-4 border-blue-800 max-w-lg flex flex-col items-center justify-center mx-auto">
                    <h1 className="my-10 font-bold mx-auto">{qrcode["text"]}</h1>
                    <div id="domQR">
                        <button type="button" className="cursor-pointer m-auto" onClick={generateQRImage}>
                            <QRCodeSVG className="border-4 border-white" value={qrcode["link"] } size={300}/></button>
                        </div>
                </div>}
            </div>}
            
            
    </div>
    )
}
