import express from 'express'
import * as inClass from '../controllers/inclass.controller.js'

export default (app) => {
    let router = express.Router();

    router.get('/studentsOfClass/:id',inClass.getStudentsOfClass)
    router.get('/classesOfStudent/:cpf',inClass.getClassesOfStudent)
    router.post('/postStudentInClass',inClass.create)
    router.delete('/deleteInClass/:scpf/:classid',inClass.deleteInClass)

    app.use('/api',router);
}