import express from 'express'
import * as students from '../controllers/student.controller.js'
import * as spreadsheetImporter from '../controllers/spreadsheet.controller.js'

export default (app) => {
    let router = express.Router();

    router.get('/getStudent/:cpf',students.getById)
    router.get('/getSpreadsheetStudents/:spreadsheetlink',spreadsheetImporter.importSpreadsheet)
    router.post('/postStudent',students.create)
    router.put('/updateStudent',students.updateStudent)
    router.delete('/deleteStudent/:cpf',students.deleteStudent)

    app.use('/api',router);
}