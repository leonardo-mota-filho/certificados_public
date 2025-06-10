import React, {useEffect ,useState} from "react";
import {Link,useParams,useNavigate} from "react-router-dom";
import services from '../../services/services.js'
import Alert from "../../models/Alert.js";
import { authCheck } from "../../models/authCheck.js";

export default function AdminUpdateStudentComponent({cpf,setDenyAcess}){
    const navigate = useNavigate()
    const [confirming,setConfirming] = useState(false)
    const [alert,setAlert] = useState(false)
    const [alertObj,setAlertObj] = useState({state:false,msg:""})
    const [student,setStudent] = useState({cpf:"",name:"",phone:""})
    const [newStudent,setNewStudent] = useState({})

    useEffect(() => {getStudent()}, []);

    const onChangeNewName = (e) =>{
        setNewStudent({cpf:newStudent["cpf"],name:e.target.value,email:newStudent["email"],phone:newStudent["phone"]})
    }
    const onChangeNewEmail = (e) =>{
        setNewStudent({cpf:newStudent["cpf"],name:newStudent["name"],email:e.target.value,phone:newStudent["phone"]})
    }
    const onChangeNewPhone = (e) =>{
        setNewStudent({cpf:newStudent["cpf"],name:newStudent["name"],email:newStudent["email"],phone:e.target.value})
    }

    const getStudent = () =>{
        services.getStudentByCpf(cpf)
            .then((response) => {
                console.log(response.data)
                setStudent(response.data[0])
                setNewStudent(response.data[0])
            })
            .catch((err)=>{
                authCheck(err,setDenyAcess)
            })
    }

    const setAlertState = (msg,state) =>{
        setAlert(true)
        setAlertObj({state:state,msg:msg})
        console.log(newStudent)
    }

    const updateStudentCheck = () => {
        if(newStudent["name"] == "" || newStudent["email"] == "" || newStudent["phone"] == ""){
            setAlertState("Preencha todos os campos!",false)
        } else{
            updateStudent()
        }
    }

    const updateStudent = () => {
        services.updateStudent({cpf:newStudent["cpf"],name:newStudent["name"],email:newStudent["email"],phone:newStudent["phone"]})
            .then((response) => {
                console.log(response)
                setAlertState("Estudante atualizado com sucesso!",true)
            })
            .catch((err) => {
                if(authCheck(err,setDenyAcess) == false){
                    setAlertState("Algo deu errado.",false)
                }
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateStudentCheck()
    }

    const deleteStudent = () => {
        console.log("Estudante deletado?")
        services.deleteStudent(student["cpf"])
            .then((response) => {
                console.log(response)
                console.log("Estudante deletado!")
                setConfirming(false)
                navigate(-1)
            })
            .catch((err) => {
                authCheck(err,setDenyAcess)
            })
    }
    return(
    <div>
        <h1 className="font-bold">Editar informações do estudante:</h1>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div>
                <h1 className="font-bold">CPF:{student["cpf"]}</h1></div>
            <div>
                <h1 className="font-bold">Nome:</h1>
                <input
                type="text"
                className="border border-gray-300 rounded-l px-2 py-1 w-4/5"
                placeholder="Nome do Estudante"
                defaultValue={newStudent["name"]}
                onChange={onChangeNewName}
                />
            </div>
            <div>
                <h1 className="font-bold">E-Mail:</h1>
                <input
                type="text"
                className="border border-gray-300 rounded-l px-2 py-1 w-4/5"
                placeholder="E-mail do Estudante"
                defaultValue={newStudent["email"]}
                onChange={onChangeNewEmail}
                />
            </div>
            <div>
                <h1 className="font-bold">Telefone:</h1>
                <input
                type="text"
                className="border border-gray-300 rounded-l px-2 py-1 w-4/5"
                placeholder="Telefone do Estudante"
                defaultValue={newStudent["phone"]}
                onChange={onChangeNewPhone}
                />
            </div>
            <div className="text-left p-4 mx-auto text-center">
                <button 
                type="button" 
                className="bg-green-500 text-white px-4 py-1 rounded" 
                onClick={() => {updateStudentCheck()}}>
                Atualizar
                </button>
            </div>
            <div>
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
                        onClick={() => {deleteStudent()}}>
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
            <Alert alertObj={alertObj} alert={alert} setAlert={setAlert}/>
        </form>
    </div>
    )
}