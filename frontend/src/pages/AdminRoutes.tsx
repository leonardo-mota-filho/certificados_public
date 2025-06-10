import {Outlet,Navigate, Route, Routes, BrowserRouter, useNavigate} from "react-router-dom"
import services from "../services/services"
import { use, useEffect, useState } from "react"
import AdminPanel from "./AdminPanel"
import AdminProfessorManagement from "./professor/AdminProfessorManagement"
import AdminCourseManagement from "./course/AdminCourseManagement"
import AdminClassManagement from "./class/AdminClassManagement"
import AdminAddStudent from "./AdminAddStudent"
import AdminClassTable from "./AdminClassTable"
import AdminUpdateStudent from "./updateStudent/AdminUpdateStudent"
import AdminSearchStudent from "./updateStudent/AdminSearchStudent"
import ProtectedRoute from "./ProtectedRoute"

export default function AdminRoute(){


    const [redirect,setRedirect] = useState(false);
    const navigate = useNavigate()
    useEffect(()=>{
      if(redirect == true){
        navigate('/adminLogin')
      }
    },[redirect])

    const logout = () => {
      services.logout()
        .then((response)=>{
          setRedirect(true)
        })
        .catch((err)=>{
          console.log(err)
        })
    }

    return(
            <div>
              <div className="h-10 grid grid-cols-5 gap-4 lg:mx-80">  
                <button 
                        type="button" 
                        className="bg-red-500 w-20 text-white rounded col-end-6 my-auto me-100" 
                        onClick={() => {logout()}}>
                        Logout
                    </button>
              </div>
              <Routes>
                <Route path="/" element={<ProtectedRoute><AdminPanel/></ProtectedRoute>}/>
                <Route path="/profs" element={<ProtectedRoute><AdminProfessorManagement/></ProtectedRoute>}/>
                <Route path="/courses" element={<ProtectedRoute><AdminCourseManagement/></ProtectedRoute>}/>
                <Route path="/classes" element={<ProtectedRoute><AdminClassManagement/></ProtectedRoute>}/>
                <Route path="/addstudent" element={<ProtectedRoute><AdminAddStudent/></ProtectedRoute>}/>
                <Route path="/viewclass" element={<ProtectedRoute><AdminClassTable/></ProtectedRoute>}/>
                <Route path="/updatestudent/:cpf" element={<ProtectedRoute><AdminUpdateStudent/></ProtectedRoute>}/>
                <Route path="/searchstudent" element={<ProtectedRoute><AdminSearchStudent/></ProtectedRoute>}/>
              </Routes>
            </div>
          
    )
}