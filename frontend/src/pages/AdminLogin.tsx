import React, {useEffect ,useState} from "react";
import { Link, useNavigate, useParams} from "react-router-dom";
import CertificateDoc from "./CertificateDoc.js";
import services from '../services/services.js'
import Alert from "../models/Alert.js";

export default function RollCallForm(){
    let navigate = useNavigate()
    const [alert,setAlert] = useState({on:false,state:false,msg:""})
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const onChangeUsername = (e) => {setUsername(e.target.value)}
    const onChangePassword = (e) => {setPassword(e.target.value)}

    const setAlertOn = (on) => {
        setAlert({on:on,state:alert["state"],msg:alert["msg"]})
    }

    const login = () => {
        services.login({username:username,password:password})
            .then((response)=>{
                navigate("/admin")
            })
            .catch((err)=>{
                console.log(err)
                setAlert({on:true,state:false,msg:"Dados incorretos."})
            })
    }

    return (
    <div className="text-left lg:w-1/2 md:w-full p-4 mx-auto text-center border">
        <form className="max-w-full mx-auto relative" onSubmit={(e) => {e.preventDefault()}}>
            <h1 className="font-bold">Admin Login</h1>
            <div className="text-left w-full p-4 mx-auto text-center">
                <h1 className="font-bold">Usuário:</h1>
                <input
                    type="text"
                    className="border border-gray-300 rounded-l px-2 py-1 w-4/5"
                    placeholder="Usuário do Administrador"
                    value={username}
                    onChange={onChangeUsername} />
                <h1 className="font-bold">Senha:</h1>
                <input
                    type="text"
                    className="border border-gray-300 rounded-l px-2 py-1 w-4/5"
                    placeholder="Senha do Administrador"
                    value={password}
                    onChange={onChangePassword} />
                <button
                    className="bg-blue-500 text-white px-4 py-1 rounded my-3"
                    onClick={login}
                    >login
                </button>
            </div>
        </form>
        <Alert alertObj={alert} alert={alert["on"]} setAlert={setAlertOn}/>
    </div>)

}