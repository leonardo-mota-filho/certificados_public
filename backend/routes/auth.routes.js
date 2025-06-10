import express from 'express'
import * as auth from '../controllers/auth.controller.js'

export default (app) => {
    let router = express.Router();
    router.post('/adminLogin',auth.adminLogin)
    router.get('/adminCheckLogin',auth.checkLogin)
    router.get('/logoutAdmin',auth.logout)
    app.use('/api',router);
}