import connection from '../models/index.js'

export const create = (req,res) => { // /api/postCourse
    const {cpf,name,email,phone} = req.body
    const insertQuery = 'INSERT INTO student (cpf,name,email,phone) VALUES ($1,$2,$3,$4)'
    connection.query(insertQuery,[cpf,name,email,phone],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send("Inserted Student")
        }
    })
}

export const getById = (req,res) => {
    const cpf = req.params.cpf;
    const insertQuery = 'SELECT cpf,name,email,phone FROM student WHERE cpf = $1'
    connection.query(insertQuery,[cpf],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send(result.rows)
        }
    })
}

export const updateStudent = (req,res) => {
    const {cpf,name,email,phone} = req.body
    const insertQuery = `UPDATE student SET cpf = $1, name = $2, email = $3, phone = $4 WHERE cpf = $1`
    connection.query(insertQuery,[cpf,name,email,phone],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send("Updated Student")
        }
    })
}

export const deleteStudent = (req,res) => {
    const cpf = req.params.cpf
    const insertQuery = `DELETE FROM student WHERE cpf = $1`
    connection.query(insertQuery,[cpf],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send("Estudante do cpf " + cpf + " removido!")
        }
    })
}