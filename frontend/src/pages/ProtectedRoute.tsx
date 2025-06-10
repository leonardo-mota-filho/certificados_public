import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import services from "../services/services";

export default function ProtectedRoute({ children }) {
  useEffect(() => {console.log("AAG")},[])
    const location = useLocation();
    const [login,setLogin] = useState(false)
    const [isCheckingLogin, setIsCheckingLogin] = useState(true);
    useEffect(()=>{services.checkLogin().then((response)=>
      {console.log(response),setLogin(true),setIsCheckingLogin(false),console.log("LOGIN")})
    .catch((err)=>
      {setLogin(false),setIsCheckingLogin(false)})},[])
    return (isCheckingLogin ? (<div><h1>Carregando</h1></div>) : 
        login ? children : (<Navigate to="/adminLogin" replace state={{ path: location.pathname }}/>))
}