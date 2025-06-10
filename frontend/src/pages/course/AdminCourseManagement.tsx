import React, {useEffect ,useState} from "react";
import { Link, useNavigate} from "react-router-dom";
import services from '../../services/services.js'
import GetOptions from "../../models/GetOptions.js";
import AdminAddCourse from "./AdminAddCourse.js";
import AdminUpdateCourse from "./AdminUpdateCourse.js";

export default function AdminCourseManagement(){
    const [denyAcess,setDenyAcess] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {getCourseOptions(),getProfessorOptions()}, []);
    useEffect(()=>{
            if(denyAcess){
                navigate('/adminLogin')
            }
        },[denyAcess])
    const [coursesHtml,setCoursesHtml] = useState([<option key={-1} defaultValue="">Escolha um Curso</option>])
    const [professorHtml,setProfessorHtml] = useState([<option key={""} defaultValue="">Nenhum</option>])
    const getCourseOptions = () =>{GetOptions["getCourseOptions"](setCoursesHtml,setDenyAcess)}
    const getProfessorOptions = () =>{GetOptions["getProfessorOptions"](setProfessorHtml,setDenyAcess)}
    return(
        <div>
            <AdminAddCourse getCourseOptions={getCourseOptions} professorHtml={professorHtml} setDenyAcess={setDenyAcess}/>
            <AdminUpdateCourse getCourseOptions={getCourseOptions} courseHtml={coursesHtml} professorHtml={professorHtml} setDenyAcess={setDenyAcess}/>
        </div>
    )
}