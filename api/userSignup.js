// Módulo que trata cadastro de novos usuários

const bcrypt = require('bcrypt')

module.exports = app => {

    const { containOrReturn, matchOrReturn } = app.api.checkFields

    const signUp = async (req, res) => {
        let newUser = req.body
        
        try {  // Fazendo validação dos campos obtidos na requisição
            containOrReturn(newUser.name, 'Nome requerido')
            containOrReturn(newUser.email, 'E-mail requerido')
            containOrReturn(newUser.password, 'Senha requerida')
            containOrReturn(newUser.confirmPassword, 'Confirmação requerida')
            matchOrReturn(newUser.password, newUser.confirmPassword, 'Senhas não conferem')
            
            const checkExistEmail = await app.mysql('users').where({ email: newUser.email }).first()  // Checando se o e-mail já não foi cadastrado
            if(checkExistEmail) throw 'E-mail já cadastrado'
        } catch(err) {
            return res.status(400).send(err)
        }

        newUser.password = hashingPass(newUser.password)  // Declarando nova propriedade em newUser "setando" o Hash recebido
        delete newUser.confirmPassword

        app.mysql('users')
            .insert(newUser)
            .then(resp => res.status(200).send(resp))
            .catch(err => res.status(500).send('Erro, tente novamente'))
    }

    const hashingPass = pass => {  // Transforma a senha de forma síncrona em Hash HS256 para gravação no DB
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(pass, salt)
    }

    const deleteUser = async (req, res) => {
        await app.mysql('users')
            .delete()
            .where(req.params)
            .then(resp => res.status(200).json({}))
            .catch(err => res.send('Erro, tente novamente'))
    }

    return { signUp, deleteUser }
}