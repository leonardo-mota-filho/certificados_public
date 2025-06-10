import { useNavigate } from 'react-router-dom';
import services from '../services/services'
import {authCheck} from './authCheck';
import { useEffect, useState } from 'react';

const getProfessorOptions = (setProfessorHtml,setDenyAcess) =>{
                services.getProfessorAll()
                    .then((response) => {
                        var professors : React.JSX.Element[] = [];
                        professors.push(<option key={""} value={""}>Nenhum</option>)
                        for(var i=0;i<response.data.length;i++){
                            professors.push(<option key={i} value={response.data[i]["cpf"]}>{response.data[i]["cpf"]} - {response.data[i]["name"]}</option>)
                        }   
                        setProfessorHtml(professors)
                    })
                    .catch((e) => {
                        if(authCheck(e,setDenyAcess) == false){
                            setProfessorHtml([<option key={""} value={""}>Nenhum</option>])
                        }
                        
                    })  
}

const getCourseOptions = (setCoursesHtml,setDenyAcess) =>{
                    services.getCourseAll()
                        .then((response) => {
                            var courses : React.JSX.Element[] = [];
                            courses.push(<option key={-1} defaultValue={-1}>Nenhum</option>)
                            for(var i=0;i<response.data.length;i++){
                                courses.push(<option key={i} value={response.data[i]["id"]}>{response.data[i]["id"]} - {response.data[i]["name"]}</option>)
                            }
                                setCoursesHtml(courses)
                            
                        })
                        .catch((e) => {
                            console.log(e)
                            if(authCheck(e,setDenyAcess) == false){
                                setCoursesHtml([<option key={-1} defaultValue={-1}>Nenhum</option>])
                            }
                        })
        }

const getClassOptions = (course,setClassesHtml,setDenyAcess) => {
            services.getClassesOfCourse(course)
                .then((response) => {
                    var classes : React.JSX.Element[] = [];
                    classes.push(<option key={-1} defaultValue={""}>Nenhuma</option>)
                    for(var i=0;i<response.data.length;i++){
                        const cod = response.data[i]["id"].split("-")[0];
                        classes.push(<option key={i} value={response.data[i]["id"]}>{response.data[i]["id"]} - Turma {cod}</option>)
                    }
                    setClassesHtml(classes)
                })
                .catch((e) => {
                    if(authCheck(e,setDenyAcess) == false){
                        setClassesHtml([<option key={-1} defaultValue={""}>Nenhuma</option>])
                    }
                    
                })
}

export default {getCourseOptions,getClassOptions,getProfessorOptions}