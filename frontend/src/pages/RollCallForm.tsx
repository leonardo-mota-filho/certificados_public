import React, {useEffect ,useState} from "react";
import { Link, useParams} from "react-router-dom";
import CertificateDoc from "./CertificateDoc.js";
import services from '../services/services.js'
import Alert from "../models/Alert.js";

export default function RollCallForm(){
    
    const {classid,pwd} = useParams()
    const [alert,setAlert] = useState({on:false,state:false,msg:""})
    const [cpf,setCpf] = useState("");
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(true)
    const [classObj,setClassObj] = useState({id:"",content:"",period:"",courseid:-1,rollcallqtd:0,rollcallpw:""})
    const [course,setCourse] = useState({id:-1,name:"",hours:0,secondprofcpf:""})
    const [rollCallNum,setRollCallNum] = useState(-1)
    useEffect(() => {getDataRollCallForm()}, []);
    const onChangeCpf = (e) => {
        setCpf(e.target.value);
    };
    const setAlertOn = (on) => {
        setAlert({on:on,state:alert["state"],msg:alert["msg"]})
    }
    
    const getDataRollCallForm = () => {
        if(classid != null && pwd != null){
            services.getClassById(classid)
                .then((response)=>{
                    setClassObj(response.data[0])
                    services.getCourseById(response.data[0]["courseid"])
                        .then((response2)=>{
                            setCourse(response2.data[0])
                            var rollcallnum = response.data[0]["rollcallpw"].split(';').indexOf(pwd) + 1
                            if(rollcallnum == 0){throw new Error("Wrong password"),setError(true),setLoading(false)}
                            setRollCallNum(rollcallnum)
                            setLoading(false)
                        })
                })
                .catch((err)=>{
                    console.log(err)
                    setError(true)
                    setLoading(false)
                })
        }
    }

    const registerRollCall = () =>{
        console.log(`${cpf}`)
        console.log(`${classObj["id"]}`)
        services.getRollCall(`${classObj["id"]}`,`${cpf}`)
            .then((response)=>{
                console.log(response.data[0]["rollcallids"].split(';'))
                if(response.data[0]["rollcallids"].split(';').includes(rollCallNum.toString()) == false) //fazer ele não registrar duplicado
                    services.updateRollCall({classid:classObj["id"],scpf:cpf,rollcallids:[response.data[0]["rollcallids"],rollCallNum].join(';')})
                        .then((response2)=>{
                            setAlert({on:true,state:true,msg:"Presença marcada com sucesso!"})})
                else{
                    setAlert({on:true,state:true,msg:"Esse aluno já foi marcado como presente!"})
                }       
            })
            .catch((err)=>{
                services.postRollCall({classid:classObj["id"],scpf:cpf,rollcallids:rollCallNum})
                    .then((response)=>{
                        if(response.data["name"] == "error"){
                            setAlert({on:true,state:false,msg:"Aluno não registrado na turma."})
                        } else{
                            setAlert({on:true,state:true,msg:"Presença marcada com sucesso!"})
                        }
                        console.log(response)
                    })
                    .catch((err)=>{
                        console.log(err)
                        setAlert({on:true,state:false,msg:"Aluno não registrado na turma."})
                    })
            })
    }
    

    return (
    <div className="text-left lg:w-1/2 md:w-full p-4 mx-auto text-center border">
        {loading == false ? error == false ? (
        <form className="max-w-full mx-auto relative" onSubmit={(e) => {e.preventDefault()}}>
            <h1 className="font-bold">Curso: {course["name"]}</h1>
            <h1 className="font-bold">Turma: {classObj["id"].substring(0, 2)}</h1>
            <h1 className="font-bold">Frequência: {rollCallNum}</h1>
            <div className="text-left w-full p-4 mx-auto text-center">
                <h1 className="font-bold">CPF do aluno:</h1>
                <input
                    type="text"
                    className="border border-gray-300 rounded-l px-2 py-1 w-4/5"
                    placeholder="CPF do Aluno"
                    value={cpf}
                    onChange={onChangeCpf} />
                <button
                    className="bg-blue-500 text-white px-4 py-1 rounded my-3"
                    onClick={registerRollCall}
                    >Registrar Presença
                </button>
                <Alert alertObj={alert} alert={alert["on"]} setAlert={setAlertOn}/>
            </div>
        </form>) : (
            <h1 className="font-bold text-red">Erro ao buscar formulário de presença.</h1>
        ) : (<h1 className="font-bold">Carregando Formulário...</h1>)}
    </div>)

}