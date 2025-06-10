import express from 'express'
import * as rollcall from '../controllers/rollcall.controller.js'

export default (app) => {
    let router = express.Router();
    router.post('/postRollCall/',rollcall.postRollCall)
    router.get('/getRollCall/:classid/:scpf',rollcall.getRollCall)
    router.get('/getRollCallOfClass/:classid',rollcall.getRollCallOfClass)
    router.put('/updateRollCall',rollcall.updateRollCall)
    
    app.use('/api',router);
}