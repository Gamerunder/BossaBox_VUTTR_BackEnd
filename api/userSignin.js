// Módulo de autenticação do usuário

const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')
const { secretJwt } = require('../.env')

module.exports = app => {

    const { containOrReturn } = app.api.checkFields

    const signIn = async (req, res) => {

        let login = req.body
        let payload = {}

        try {
            containOrReturn(login.email, 'E-mail requerido')
            containOrReturn(login.password, 'Senha requerida')

            let checkUser = await app.mysql('users').where({ email: login.email }).first()  // Checando e-mail
            let checkPass = bcrypt.compareSync(login.password, checkUser.password)  //  Comparando senha/hash forma síncrona
            if(!checkUser || !checkPass) throw 'E-mail ou senha inválido(s)'
            payload = checkUser
        } catch(err) {
            return res.status(400).send(err)
        }
        const tokenToFront = genToken(payload)  // Gera um novo token enviado-o para a requisição, esse token será obrigatório para acesso a rotas restritas da API
        res.send({ token: tokenToFront })
    }

    const genToken = data => {  // Gera um token contendo 'ID', 'EMAIL', 'iat', 'exp' que irá expirar em de 5 horas
        const payload = {
            id: data.id,
            email: data.email,
            iat: Math.floor(Date.now() /1000),
            exp: Math.floor(Date.now() /1000) + (60 * 60 * 5)
        }
        return jwt.encode(payload, secretJwt)
    }
    return { signIn }
}