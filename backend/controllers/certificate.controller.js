import connection from '../models/index.js'

export const create = (req,res) => { // /api/postCourse
    const {scpf,classid,isavailable} = req.body
    const insertQuery = `WITH count_existing AS (
                            SELECT COUNT(*) AS count 
                            FROM certificate 
                            WHERE classid = $2
                        )
                        INSERT INTO certificate (id, scpf, classid, isavailable)
                        SELECT 
                            CONCAT(LPAD((count+1)::text, 3, '0'),'-',$2),
                            $1,
                            $2,
                            $3
                        FROM count_existing;`
    //'INSERT INTO certificate (scpf,classid,isavailable) VALUES ($1,$2,$3)'
    connection.query(insertQuery,[scpf,classid,isavailable],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send("Inserted Certificate")
        }
    })
}

export const getById = (req,res) => {
    const id = req.params.id;
    const insertQuery = 'SELECT id,scpf,classid,isavailable FROM certificate WHERE id = $1'
    connection.query(insertQuery,[id],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send(result.rows)
        }
    })
}

export const getByCpfClassid = (req,res) => {
    const cpf = req.params.cpf;
    const classid = req.params.classid;
    const insertQuery = `SELECT t1.id, t1.sname,t1.scpf,t1.id,t1.isavailable,t1.name,t1.content,t1.period,t1.hours,p.name as secondprofname, p.signatureurl FROM 
                        (SELECT c.id, s.name AS sname,c.scpf,c.isavailable, co.name, cl.content, cl.period, co.hours, co.secondprofcpf
                        FROM certificate c, classinfo cl, course co, student s
                        WHERE (c.scpf = $1 AND c.classid = $2 AND s.cpf = c.scpf AND c.classid = cl.id AND cl.courseid = co.id)) t1
                        LEFT JOIN professor p
                        ON t1.secondprofcpf = p.cpf`
    connection.query(insertQuery,[cpf,classid],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send(result.rows)
        }
    })
}

export const updateCerticateAvailability = (req,res) => {
    const {cpf,classid,available} = req.body
    console.log(available)
    const insertQuery = `UPDATE certificate SET isavailable = $3 WHERE scpf = $1 AND classid = $2`
    connection.query(insertQuery,[cpf,classid,available],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send(result.rows)
        }
    })
}

export const getCertificatesOfStudent = (req,res) => {
    const scpf = req.params.cpf
     const insertQuery = 'SELECT id,scpf,classid,isavailable FROM certificate WHERE scpf = $1'
     connection.query(insertQuery,[scpf],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send(result.rows)
        }
    })
}