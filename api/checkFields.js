// Checagem superficial se existe dados nos campos obtidos na requisição

module.exports = app => {

    const containOrReturn = (data, msg) => {  //  Contém algum dado no campo ?
        if(!data) throw msg
    }

    const matchOrReturn = (data1, data2, msg) => {  // Dado 1 e dado 2 são iguais ?
        if(data1 !== data2) throw msg
    }

    return { containOrReturn, matchOrReturn }
}