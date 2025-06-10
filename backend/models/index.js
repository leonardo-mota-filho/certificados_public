import {Client} from 'pg'
import dotenv from 'dotenv' 

dotenv.config({ path: "./.env" })

const connection = new Client({
    host:process.env.DBHOST,
    user: process.env.DBUSER,
    port: process.env.DBPORT,
    password: process.env.DBPASSWORD, 
    database: process.env.DATABASE
})

export default connection