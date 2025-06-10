import axios from "axios"

const http = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
})

//Certificate
const getCertificateById = (id) => {
    return http.get(`/getCertificate/${id}`);
};
const getCertificatesOfStudent = (cpf) => {
    return http.get(`/certificatesOfStudent/${cpf}`)
}
const getCertificateByCpfClass = (cpf,classid) => {
    return http.get(`/certificateOfStudentClass/${cpf}/${classid}`)
}
const postCertificate = (data) => {
    return http.post(`/postCertificate`,data)
}
const updateCertificate = (data) => {
    return http.post(`/updateCerticateAvailability`,data)
}

//Classinfo
const getClassById = (id) => {
    return http.get(`/getClass/${id}`)
}
const postClass = (data) => {
    return http.post(`/postClass`,data)
}

const getClassesOfCourse = (courseid) => {
    return http.get(`/getClassOfCourse/${courseid}`)
}

const updateClass = (data) => {
    return http.put('/updateClass',data)
}

const deleteClass = (classid) => {
    return http.delete(`/deleteClass/${classid}`)
}

//Course
const getCourseById = (id) => {
    return http.get(`/getCourse/${id}`)
}
const getCourseAll = () => {
    return http.get('/getAllCourses')
}
const postCourse = (data) => {
    return http.post(`/postCourse`,data)
}
const updateCourse = (data) => {
    return http.put('/updateCourse',data)
}
const deleteCourse = (id) => {
    return http.delete(`/deleteCourse/${id}`)
}

//inClass
const getStudentsOfClass = (id) => {
    return http.get(`/studentsOfClass/${id}`)
}
const getClassesOfStudent = (cpf) => {
    return http.get(`/classesOfStudent/${cpf}`)
}
const postStudentInClass = (data) => {
    return http.post(`/postStudentInClass`,data)
}
const deleteInClass = (scpf,classid) => {
    return http.delete(`/deleteInClass/${scpf}/${classid}`)
}

const getStudentsFromSheet = (spreadsheetLink) => {
    return http.get(`/getSpreadsheetStudents/${spreadsheetLink}`)
}

//Professor
const getProfessorByCpf = (cpf) => {
    return http.get(`/getProfessor/${cpf}`)
}
const getProfessorAll = () => {
    return http.get(`/getProfessorAll`)
}
const postProfessor = (data) => {
    return http.post(`/postProfessor`,data)
}
const updateProfessor = (data) => {
    return http.put(`/updateProfessor`,data)
}
const deleteProfessor = (cpf) => {
    return http.delete(`/deleteProfessor/${cpf}`)
}

//Student
const getStudentByCpf = (cpf) => {
    return http.get(`/getStudent/${cpf}`)
}
const postStudent = (data) => {
    return http.post(`/postStudent`,data)
}

const updateStudent = (data) => {
    return http.put(`/updateStudent`,data)
}

const deleteStudent = (cpf) => {
    return http.delete(`/deleteStudent/${cpf}`)
}

const getImage = (url) => {
    return http.get(`/getImage/${encodeURIComponent(url)}`)
}

//RollCall

const postRollCall = (data) => {
    return http.post(`/postRollCall`,data)
}

const getRollCall = (classid,scpf) => {
    return http.get(`/getRollCall/${classid}/${scpf}`)
}

const getRollCallOfClass = (classid) => {
    return http.get(`/getRollCallOfClass/${classid}`)
}

const updateRollCall = (data) => {
    return http.put(`/updateRollCall`,data)
}

//auth
const login = (data) => {
    return http.post(`/adminLogin`,data)
}

const checkLogin = () => {
    return http.get('/adminCheckLogin')
}

const logout = () => {
    return http.get('/logoutAdmin')
}



export default {
    getCertificateById,
    getCertificatesOfStudent,
    getCertificateByCpfClass,
    postCertificate,
    updateCertificate,
    getClassById,
    getClassesOfCourse,
    postClass,
    updateClass,
    getCourseById,
    getCourseAll,
    postCourse,
    updateCourse,
    deleteCourse,
    getStudentsOfClass,
    getClassesOfStudent,
    deleteClass,
    postStudentInClass,
    deleteInClass,
    getStudentsFromSheet,
    getProfessorByCpf,
    getProfessorAll,
    postProfessor,
    updateProfessor,
    deleteProfessor,
    getStudentByCpf,
    postStudent,
    updateStudent,
    deleteStudent,
    getImage,
    postRollCall,
    getRollCall,
    getRollCallOfClass,
    updateRollCall,
    login,
    checkLogin,
    logout
};