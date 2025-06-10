import express from 'express'
import * as certificates from '../controllers/certificate.controller.js'

export default (app) => {
    let router = express.Router();

    router.get('/getCertificate/:id',certificates.getById)
    router.get('/certificatesOfStudent/:cpf',certificates.getCertificatesOfStudent)
    router.get('/certificateOfStudentClass/:cpf/:classid',certificates.getByCpfClassid)
    router.post('/postCertificate',certificates.create)
    router.post('/updateCerticateAvailability',certificates.updateCerticateAvailability)

    app.use('/api',router);
}