import express from 'express'
import * as courses from '../controllers/course.controller.js'

export default (app) => {
    let router = express.Router();

    router.get('/getCourse/:id',courses.getById)
    router.get('/getAllCourses',courses.getAll)
    router.post('/postCourse',courses.create)
    router.put('/updateCourse',courses.updateCourse)
    router.delete('/deleteCourse/:id',courses.deleteCourse)

    app.use('/api',router);
}