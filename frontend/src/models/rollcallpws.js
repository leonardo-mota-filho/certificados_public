export const generateRollCall = (size) => {
    var finalVal = new Array()
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    for (var i = 0; i < size; i++) {
        var tempVal = ""
        for(var j = 0; j < size; j++){
            tempVal += charset.charAt(Math.floor(Math.random() * charset.length))
        }
        if(finalVal.includes(tempVal)){
            i -= 1
        } else {
            finalVal.push(tempVal)
        }
    }
    console.log(finalVal.join(';'))
    return finalVal.join(';')
}