import connection from '../models/index.js'

export const postRollCall = (req,res) => { 
    const {scpf,classid,rollcallids} = req.body
    const insertQuery = 'INSERT INTO rollcall (scpf,classid,rollcallids) VALUES ($1,$2,$3)'
    connection.query(insertQuery,[scpf,classid,rollcallids],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send("Inserted Rollcall")
        }
    })
}

export const getRollCall= (req,res) => {
    const scpf = req.params.scpf
    const classid = req.params.classid
    const insertQuery = 'SELECT scpf,classid,rollcallids FROM rollcall WHERE scpf = $1 AND classid = $2'
    connection.query(insertQuery,[scpf,classid],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send(result.rows)
        }
    })
}

export const getRollCallOfClass= (req,res) => {
    const classid = req.params.classid
    const insertQuery = 'SELECT scpf,classid,rollcallids FROM rollcall WHERE classid = $1'
    connection.query(insertQuery,[classid],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send(result.rows)
        }
    })
}

export const updateRollCall = (req,res) => {
    const {scpf,classid,rollcallids} = req.body 
    const insertQuery = `UPDATE rollcall SET scpf = $1, classid = $2, rollcallids = $3 WHERE scpf = $1 AND classid = $2`
    connection.query(insertQuery,[scpf,classid,rollcallids],(err,result)=> {
        if(err){
            res.send(err)
        } else{
            console.log(result)
            res.send("Updated RollCall")
        }
    })
}
