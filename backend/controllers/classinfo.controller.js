import connection from '../models/index.js'

export const create = (req,res) => { // /api/postCourse
    const {content,period,courseid,rollcallqtd,rollcallpw} = req.body
    const insertQuery = `WITH count_existing AS (
                            SELECT COUNT(*) AS count 
                            FROM classinfo 
                            WHERE courseid = $3
                        )
                        INSERT INTO classinfo (id, content, period, courseid, rollcallqtd,rollcallpw)
                        SELECT 
                            CONCAT(LPAD((count+1)::text, 2, '0'),'-',$3),
                            $1,
                            $2,
                            $3,
                            $4,
                            $5
                        FROM count_existing;`
    connection.query(insertQuery,[content,period,courseid,rollcallqtd,rollcallpw],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send("Inserted Class")
        }
    })
}

export const getById = (req,res) => {
    const id = req.params.id;
    const insertQuery = 'SELECT id,content,period,courseid,rollcallqtd,rollcallpw FROM classinfo WHERE id = $1'
    connection.query(insertQuery,[id],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send(result.rows)
        }
    })
}

export const getClassesOfCourse = (req,res) => {
    const courseid = req.params.courseid
    const insertQuery = 'SELECT * FROM classinfo cl WHERE cl.courseid = $1'
    connection.query(insertQuery,[courseid],(err,result) => {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send(result.rows)
        }
    })
}

export const deleteClass = (req,res) => {
    const classid = req.params.classid
    const insertQuery = 'DELETE FROM classinfo WHERE id = $1'
    connection.query(insertQuery,[classid],(err,result) => {
        if(err){
            res.send(err)
        } else{
            res.send("Turma deletada!")
        }
    })
}

export const updateClass = (req,res) => {
    const {id,content,period} = req.body 
    const insertQuery = `UPDATE classinfo SET content = $2, period = $3, rollcallqtd = $4, rollcallpw = 5$ WHERE id = $1`
    connection.query(insertQuery,[id,content,period],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send("Updated Class")
        }
    })
}