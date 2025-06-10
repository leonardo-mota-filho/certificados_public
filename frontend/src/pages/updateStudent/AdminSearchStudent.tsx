import React, {useEffect ,useState} from "react";
import {Link,useNavigate,useParams} from "react-router-dom";
import services from '../../services/services.js'
import AdminUpdateStudentComponent from "./AdminUpdateStudentComponent.js";
import Alert from "../../models/Alert.js";
import BackButton from "../../models/BackButton.tsx";

export default function AdminSearchStudent(){
    const [alert,setAlert] = useState(false)
    const [cpf,setCpf] = useState("")
    const [editor,setEditor] = useState(<div></div>)
    const onChangeCpf = (e) => {
        setCpf(e.target.value)
    }
    const [denyAcess,setDenyAcess] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        if(denyAcess){
            navigate('/adminLogin')
        }
    },[denyAcess])

    const searchStudent = () => {
        services.getStudentByCpf(cpf)
            .then((response)=>{
                console.log(response)
                if(response.data.length > 0){
                    setEditor(<AdminUpdateStudentComponent cpf={cpf} setDenyAcess={setDenyAcess}/>)
                } else{
                    setEditor(<div></div>)
                    setAlert(true)
                }
            })
            .catch((err) => {
                console.log(err)
                setAlert(true)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        searchStudent()
    }

    return(
         <div className="text-left lg:w-1/2 md:w-full p-4 mx-auto text-center border">
            <BackButton to="/admin"/>
            <h1 className="font-bold">Buscar estudante</h1>
            <form className="text-left w-auto p-4 mx-auto text-center" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="border border-gray-300 rounded-l px-2 py-1 w-4/5"
                    placeholder="CPF do estudante"
                    value={cpf}
                    onChange={onChangeCpf}
                />
            <button 
                type="button"
                className="bg-blue-500 text-white px-4 py-1 rounded"
                onClick={() => (searchStudent())}
            >
            Buscar
            </button>
        </form>
        <Alert alertObj={{state:false,msg:"Não foi possível encontrar aluno com o CPF inserido"}} alert={alert} setAlert={setAlert}/>
        {editor}
    </div>
    )
}