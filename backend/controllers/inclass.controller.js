import connection from '../models/index.js'

export const create = (req,res) => { // /api/postCourse
    const {scpf,classid} = req.body
    const insertQuery = 'INSERT INTO inclass (scpf,classid) VALUES ($1,$2)'
    connection.query(insertQuery,[scpf,classid],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send("Inserted inClass Relation")
        }
    })
}

export const getStudentsOfClass = (req,res) => {
    const id = req.params.id;
    const insertQuery = `SELECT cl.scpf, s.name, s.email, s.phone, c.isavailable FROM inclass cl, student s, certificate c
                        WHERE (cl.classid = $1 AND s.cpf = cl.scpf AND cl.scpf = c.scpf AND c.classid = cl.classid)`
    connection.query(insertQuery,[id],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send(result.rows)
        }
    })
}

export const getClassesOfStudent = (req,res) => {
    const scpf = req.params.cpf;
    const insertQuery = `SELECT c.classid,co.name, cf.isavailable FROM inclass c, classinfo cl ,course co, certificate cf 
                        WHERE (c.scpf = $1 AND c.classid= cl.id AND cl.courseid = co.id AND cf.scpf = c.scpf AND cf.classid = c.classid)`
    connection.query(insertQuery,[scpf],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send(result.rows)
        }
    })
}
export const deleteInClass = (req,res) => {
    const classid = req.params.classid
    const scpf = req.params.scpf
    const insertQuery = 'DELETE FROM inclass WHERE scpf = $1 AND classid = $2'
     connection.query(insertQuery,[scpf,classid],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send("Participação na turma deletada!")
        }
    })
}