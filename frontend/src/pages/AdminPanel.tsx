import React, {useEffect ,useState} from "react";
import { Link} from "react-router-dom";
import services from '../services/services.js'

export default function AdminPanel(){
    return(
    <div className="text-left lg:w-1/2 md:w-full p-4 mx-auto text-center border flex flex-col space-y-2">
        <h1 className="font-bold">Escolha uma das seguintes operações:</h1>
        <Link  to="/admin/profs">- Administrar Professores do Sistema</Link>
        <Link to="/admin/courses">- Administrar Cursos do Sistema</Link>
        <Link to="/admin/classes">- Administrar Turma no Sistema</Link>
        <Link to="/admin/addstudent">- Adicionar Estudante ao Sistema</Link>
        <Link to="/admin/viewclass">- Visualizar Turma do sistema</Link>
        <Link to="/admin/searchstudent">- Buscar estudante</Link>
    </div>)
}