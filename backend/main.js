import connection from './models/index.js'
import express from 'express'
import cors from 'cors'
import courseRoutes from './routes/course.routes.js'
import professorRoutes from './routes/professor.routes.js'
import inClassRoutes from './routes/inclass.routes.js'
import classRoutes from './routes/classinfo.routes.js'
import studentRoutes from './routes/student.routes.js'
import certificateRoutes from './routes/certificate.routes.js'
import signatureRoutes from './routes/signature.routes.js'
import rollCallRoutes from './routes/rollcall.routes.js'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import { authMiddleware } from './middlewares/auth.middleware.js'
import dotenv from 'dotenv' 

dotenv.config({ path: "./.env" })

const app = express()
app.use(express.json({limit: '50mb'}))

app.use(cookieParser())

const corsOptions = {
    origin: process.env.ALLOWED_DOMAIN,
    credentials: true
};
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:true,limit: '50mb'}));

connection.connect()
    .then(() => console.log(`BD conectado à porta ${connection.port}`))
    .catch(err => {console.log("Não foi possível conectar ao BD"), process.exit()})

app.use(authMiddleware)
authRoutes(app)
courseRoutes(app)
professorRoutes(app)
inClassRoutes(app)
classRoutes(app)
studentRoutes(app)
certificateRoutes(app)
signatureRoutes(app)
rollCallRoutes(app)

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server is running at PORT ${PORT}`)
})

