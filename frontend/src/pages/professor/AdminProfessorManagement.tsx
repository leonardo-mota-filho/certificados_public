import React, {useEffect ,useState} from "react";
import { Link, useNavigate} from "react-router-dom";
import services from '../../services/services.js'
import getOptions from '../../models/GetOptions.js'
import AdminAddProfessor from './AdminAddProfessor.js'
import AdminUpdateProfessor from "./AdminUpdateProfessor.js";

export default function AdminProfessorManagement(){
    const [professorHtml,setProfessorHtml] = useState([<option key={-1} defaultValue="">Nenhum</option>])
    const professorOptions = () => {getOptions["getProfessorOptions"](setProfessorHtml,setDenyAcess)}
    
    useEffect(() => {professorOptions()}, []); //poptions
    const [denyAcess,setDenyAcess] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        if(denyAcess){
            navigate('/adminLogin')
        }
    },[denyAcess])

    return(
        <div>
            <AdminAddProfessor getProfessorOptions={professorOptions} setDenyAcess={setDenyAcess}/>
            <AdminUpdateProfessor getProfessorOptions={professorOptions} professorHtml={professorHtml} setDenyAcess={setDenyAcess}/>
        </div>
    )
}