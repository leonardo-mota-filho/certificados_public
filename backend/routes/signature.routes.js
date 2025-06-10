import express from 'express'
import * as signatures from '../controllers/signature.controller.js'

export default (app) => {
    let router = express.Router();

    router.get('/getImage/*url',signatures.getImage)

    app.use('/api',router);
}