import React, {useEffect ,useState} from "react";
import { Link} from "react-router-dom";
import CertificateDoc from "./CertificateDoc";
import services from '../services/services.js'
import { generateSinglePdf } from "../models/generatePdf.js";

function Certificate(){
    const [loading,setLoading] = useState(false) //Solução temporária para a questão do Vercel

    const [cpf,setCpf] = useState("");
    const [userOptions,setUserOptions] = useState([{}]);
    const [notFound, setNotFound] = useState(false);
    const [username, setUsername] = useState("");

    const onChangeCpf = (e) => {
        setCpf(e.target.value);
    };

    function getUserHtml(){
        try{
            var ui : React.JSX.Element[] = []
            if(Object.keys(userOptions[0]).length != 0){
                ui.push(<dt key="username"><h1 className="font-bold">Aluno: {username}</h1></dt>)
                userOptions.forEach((course,i) => {
                    ui.push(<dt key={i}><h1 className="font-bold">{course["coursename"]}</h1></dt>)
                    course["turmas"].forEach((turma,j) => {
                    const cod = turma.split("-")[0];
                    ui.push(<dd key={turma}><Link to={`/certificate/${cpf}/${turma}`} target="_blank">- Turma {cod}</Link></dd>)
                })
            })
        }
        return(ui)
        } catch{
            return(<h1 className="font-bold text-red-500">Nenhum certificado foi encontrado para um usuário com o CPF inserido.</h1>)
        }
    }

    const getUsername = (cpf) => {
        services.getStudentByCpf(cpf)
            .then((response) => {
                setUsername(response.data[0]["name"])
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getUserOptions = (cpf) => {
        services.getClassesOfStudent(cpf)
            .then((response) => {
                var courses : Object[] = [];
                for (var i=0;i<response.data.length;i++){
                    if(response.data[i]["isavailable"] == true){
                        if(!courses.includes(response.data[i]["name"])){
                            courses.push({coursename:response.data[i]["name"],turmas:[response.data[i]["classid"]]})
                        } else{
                            for(var j=0;j<courses.length;j++){
                                if(courses[j]["coursename"] == response.data[i]["name"]){
                                    courses[j]["turmas"].push(response.data[i]["classid"])
                                }
                                break;
                            }
                        }
                    }
                }
                setNotFound(false)
                setUserOptions(courses)
            })
            .catch((err) => {
                console.log(err)
                setNotFound(true)
            })
    }

    

    return (
        <div>
            <div className="flex mb-4">

        </div>
        <div className="text-left lg:w-1/2 md:w-full p-4 mx-auto text-center border">
            <h1 className="font-bold">CPF do aluno:</h1>
            <input
                type="text"
                className="border border-gray-300 rounded-l px-2 py-1 w-4/5"
                placeholder="CPF do Aluno"
                value={cpf}
                onChange={onChangeCpf}
            />
            <button
                className="bg-purple-500 text-white px-4 py-1 rounded-r"
                onClick={() => (getUserOptions(cpf),getUsername(cpf))}
            >
            Consultar
            </button>
            <dl>{getUserHtml()}</dl>
        </div>
      </div>
    );
}

export default Certificate;