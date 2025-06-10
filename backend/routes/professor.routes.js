import express from 'express'
import * as profs from '../controllers/professor.controller.js'

export default (app) => {
    let router = express.Router();

    router.get('/getProfessor/:cpf',profs.getById)
    router.get('/getProfessorAll',profs.getAll)
    router.post('/postProfessor',profs.create)
    router.put('/updateProfessor',profs.updateProfessor)
    router.delete('/deleteProfessor/:cpf',profs.deleteProfessor)

    app.use('/api',router);
}