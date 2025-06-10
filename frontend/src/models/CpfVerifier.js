const validateCpf = (cpfCandidate) => {
        console.log("0")
        if(cpfCandidate.length == 11){
            console.log("1")
            if(/^\d+$/.test(cpfCandidate)){
                console.log(2)
                //Validação dos dígitos do cpf
                //return true
                var sum1 = 0
                for(var i = 0;i<9;i++){
                    sum1 += parseInt(cpfCandidate[i]) * (10-i)
                }
                var digit1 = 11 - (sum1 % 11)
                digit1 = digit1 >= 10 ? 0 : digit1
                var sum2 = 0
                for(var i = 0;i<10;i++){
                    sum2 += parseInt(cpfCandidate[i]) * (11-i)
                }
                var digit2 = 11 - (sum2 % 11)
                digit2 = digit2 >= 10 ? 0 : digit2
                console.log(digit1)
                console.log(digit2)
                if(digit1 == cpfCandidate[9] && digit2 == cpfCandidate[10] ) {return true}
            }
        }
    return false
}

export default validateCpf;