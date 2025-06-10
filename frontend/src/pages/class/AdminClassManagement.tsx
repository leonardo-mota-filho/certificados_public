import React, {useEffect ,useState} from "react";
import { Link, useNavigate} from "react-router-dom";
import services from '../../services/services.js'
import GetOptions from "../../models/GetOptions.js";
import AdminAddClass from "./AdminAddClass.js";
import AdminUpdateClass from "./AdminUpdateClass.js";

export default function AdminClassManagement(){
    const [denyAcess,setDenyAcess] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {getCourseOptions()}, [])
    useEffect(()=>{
                if(denyAcess){
                    navigate('/adminLogin')
                }
            },[denyAcess])
    const [classesHtml,setClassesHtml] = useState([<option key={-1} defaultValue={""}>Nenhuma</option>])
    const [coursesHtml,setCoursesHtml] = useState([<option key={-1} defaultValue={""}>Nenhum</option>])
    const getCourseOptions = () =>{GetOptions["getCourseOptions"](setCoursesHtml,setDenyAcess)}
    const getClassOptions = (course) => {GetOptions["getClassOptions"](course,setClassesHtml,setDenyAcess)}
    return(
        <div>
            <AdminAddClass getClassOptions={getClassOptions} coursesHtml={coursesHtml} setDenyAcess={setDenyAcess}/>
            <AdminUpdateClass getClassOptions={getClassOptions} classesHtml={classesHtml}coursesHtml={coursesHtml} setDenyAcess={setDenyAcess}/>
        </div>
    )
}