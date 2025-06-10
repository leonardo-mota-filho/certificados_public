import express from 'express'
import * as classes from '../controllers/classinfo.controller.js'

export default (app) => {
    let router = express.Router();

    router.get('/getClass/:id',classes.getById)
    router.get('/getClassOfCourse/:courseid',classes.getClassesOfCourse)
    router.post('/postClass',classes.create)
    router.put('/updateClass',classes.updateClass)
    router.delete('/deleteClass/:classid',classes.deleteClass)

    app.use('/api',router);
}