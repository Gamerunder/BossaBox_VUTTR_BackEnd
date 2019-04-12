// Módulo de rotas
module.exports = app => {
    
    // Rota para cadastrar novos usuários
    app.post('/signup', app.api.userSignup.signUp)
    
    // Rota de login e obter Token de validação
    app.post('/signin', app.api.userSignin.signIn)

    // Rota deletar usuário por Id
    app.route('/user/:id')
        .all(app.api.passport.authenticate())  // Middleware que checa existêmcia/validade do token na requisição, liberando ou bloqueando as rotas
        .delete(app.api.userSignup.deleteUser)
        
    // Rotas GET e POST para fazer consultas completas ou parciais usando 'TAGS" como filtro e também para cadastrar novas ferramentas
    app.route('/tools')
        .all(app.api.passport.authenticate())
        .get(app.api.toolsCrud.listTools)
        .post(app.api.toolsCrud.newTool)

    // Rota deletar ferramenta por Id
    app.route('/tools/:id')
        .all(app.api.passport.authenticate())
        .delete(app.api.toolsCrud.deleteTool)
        
    }