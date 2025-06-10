import connection from '../models/index.js'

export const create = (req,res) => { // /api/postCourse
    const {name,hours,secondprofcpf} = req.body
    const insertQuery = 'INSERT INTO course (name,hours,secondprofcpf) VALUES ($1,$2,$3)'
    connection.query(insertQuery,[name,hours,secondprofcpf],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send("Inserted Course")
        }
    })
}
export const getAll = (req,res) => {
    const insertQuery = 'SELECT * FROM course'
    connection.query(insertQuery,[],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send(result.rows)
        }
    })
}
export const getById = (req,res) => {
    const id = req.params.id;
    const insertQuery = 'SELECT id, name, hours, secondprofcpf FROM course WHERE id = $1'
    connection.query(insertQuery,[id],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send(result.rows)
        }
    })
}

export const deleteCourse = (req,res) => {
    const id = req.params.id;
    const insertQuery = `DELETE FROM course WHERE id = $1`
    connection.query(insertQuery,[id],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send("Curso deletado!")
        }
    })
}

export const updateCourse = (req,res) => {
    const {id,name,hours,secondprofcpf} = req.body 
    const insertQuery = `UPDATE course SET name = $2, hours = $3, secondprofcpf = $4 WHERE id = $1`
    connection.query(insertQuery,[id,name,hours,secondprofcpf],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send("Updated Course")
        }
    })
}