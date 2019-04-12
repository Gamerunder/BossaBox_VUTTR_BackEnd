// Módulo que trata a table 'tools' do Bando de Dados MySQL

module.exports = app => {
    
    const newTool = (req, res) => {  // Insere nova ferramenta no Bando de dados
            app.mysql('tools')
            .insert({ ...req.body, tags: JSON.stringify(req.body.tags) }) // Fazendo insert padrão, porém passando o array para String salvando assim sem imcompatibilidades, uma vez que será usado somente para consultas
            .then(resp => res.send({ ...req.body, id: resp[0] }))
            .catch(err => res.send(err))
    }
    
    const listTools = (req, res) => {  // Lista todas as ferramentas ou as filtra por'tags' como parâmetro
        if(req.query.tags) {
            app.mysql('tools')
                .select()
                .where('tags', 'like', `%${req.query.tags}%`)
                .then(resp => res.json(resp))
                .catch(err => res.status(404))
        } else {
            app.mysql('tools')
                .select()
                .then(resp => res.json(resp))
                .catch(err => res.status(400))
        }
    }
    
    const deleteTool = (req, res) => {  // Deletar uma ferramenta usando 'ID' como parâmetro
        app.mysql('tools')
            .delete()
            .where(req.params)
            .then(resp => res.status(200).json({}))
            .catch(err => res.status(404))
    }

    return { newTool, listTools, deleteTool }
}

