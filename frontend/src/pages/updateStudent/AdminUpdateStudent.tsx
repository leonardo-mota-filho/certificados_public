import { useEffect, useState } from "react";
import BackButton from "../../models/BackButton.tsx";
import AdminUpdateStudentComponent from "./AdminUpdateStudentComponent.js";
import {useNavigate, useParams} from "react-router-dom";

export default function AdminUpdateStudent(){
    const {cpf} = useParams()
    const [denyAcess,setDenyAcess] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        if(denyAcess){
            navigate('/adminLogin')
        }
    },[denyAcess])
    return(
    <div className="text-left lg:w-1/2 md:w-full p-4 mx-auto text-center border">
        <BackButton to="/admin/viewclass"/>
        <AdminUpdateStudentComponent cpf={cpf} setDenyAcess={setDenyAcess}/>
    </div>)
}