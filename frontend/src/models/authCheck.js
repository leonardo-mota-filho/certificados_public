import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import services from "../services/services";

//Problema atual: nãoo posso usar navigate dentro de promises por ser um hook
export function authCheck(err,setDenyAcess) {
    console.log("VERIFICARR")
    console.log(err)
    var redirect = err["response"]["data"]["redirect"]
    console.log(redirect)
    if(redirect !== undefined && redirect == true){
        console.log("DESLOGARRR")
        setDenyAcess(true)
        return true
    }

    return false
}
