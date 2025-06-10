import connection from '../models/index.js'

export const create = (req,res) => { // /api/postCourse
    const {cpf,name,signatureurl} = req.body
    const insertQuery = 'INSERT INTO professor (cpf,name,signatureurl) VALUES ($1,$2,$3)'
    connection.query(insertQuery,[cpf,name,signatureurl],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send("Inserted Professor")
        }
    })
}

export const getById = (req,res) => {
    const cpf = req.params.cpf;
    const insertQuery = 'SELECT cpf,name,signatureurl FROM professor WHERE cpf = $1'
    connection.query(insertQuery,[cpf],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send(result.rows)
        }
    })
}
export const getAll = (req,res) => {
    const insertQuery = 'SELECT * FROM professor'
    connection.query(insertQuery,[],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send(result.rows)
        }
    })
}

export const deleteProfessor = (req,res) => {
    const cpf = req.params.cpf
    const insertQuery = 'DELETE FROM professor WHERE cpf = $1'
    connection.query(insertQuery,[cpf],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send("Professor com cpf " + cpf + "deletado!")
        }
    })
}

export const updateProfessor = (req,res) => {
    const {cpf,name,signatureurl} = req.body 
    const insertQuery = `UPDATE professor SET cpf = $1, name = $2, signatureurl = $3 WHERE cpf = $1`
    connection.query(insertQuery,[cpf,name,signatureurl],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send("Updated Professor")
        }
    })
}