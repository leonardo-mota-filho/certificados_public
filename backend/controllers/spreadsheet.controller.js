import {google} from 'googleapis'

const auth = new google.auth.GoogleAuth({
    keyFile:'./models/google.json',
    scopes:['https://www.googleapis.com/auth/spreadsheets']
})

export async function importSpreadsheet(req,res) {
    const {spreadsheetlink} = req.params
    //Modelo: https://docs.google.com/spreadsheets/d/[id]/edit?usp=sharing
    //extract id
    var spreadsheetId = spreadsheetlink.split('*')[5]
    var rows = await readSheet(spreadsheetId)
    var columns = rows.shift()
    var objs = rows.map(function(x) {
                            var values = {}
                            var counter = 0
                            columns.forEach(key => {
                                values[key] = x[counter]
                                counter += 1
                            })
                            return values})
    res.send(objs)
}

async function readSheet(spreadsheetId){
    const sheets = google.sheets({version:'v4',auth})
    //var spreadsheetId = '1uPShIi40y6_A_5_EJZEWd7y9DsuKSiIKBsy8-2x7J6A'
    const range = "A1:ZZZ"
    try{
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,range
        })
        const rows = response.data.values
        return rows
    } catch (err){
        console.log(err)
        return err
    }
}
