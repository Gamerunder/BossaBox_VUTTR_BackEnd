describe('Routes Tools / Users', () => {

    let idCurenteTest
    let idCurrentUser
    let bearerToken
    const newUser = {
        name: 'Pudge Butcher Silva',
        email: 'joao@hotmail.com',
        password: '12345',
        confirmPassword: '12345'
    }
    const newTool = {
        title: 'Google AI',
        link: 'https://ai.google/',
        description: 'Artificial intelligence',
        tags: ['future', 'intelligence', 'arificial', 'internet', 'things']
    }

    describe('Route POST /signup', () => {
        it('creating a new user', done => {
            request
                .post('/signup')
                .send(newUser)
                .end((err, res) => {
                    idCurrentUser = res.body[0]
                    expect(res.statusCode).to.be.eql(200)
                    done(err)
                })
        })
    })

    describe('Route POST /signin', () => {
        it('login authentication and receiving a new token', done => {
            request
                .post('/signin')
                .send({ email: newUser.email, password: newUser.password })
                .end((err, res) => {
                    bearerToken = res.body.token
                    expect(res.body.token).to.be.a('String')
                    done(err)
                })
        })
    })


    describe('Route POST /tools', () => {
        it('create a new tool', done => {
            request
                .post('/tools')
                .set('Authorization', `Bearer ${bearerToken}`)
                .send(newTool)
                .end((err, res) => {
                    idCurenteTest = res.body.id
                    expect(res.body.id).to.be.a('Number')
                    done(err)
                })
        })
    })

    describe('Route GET /tools', () => {
        it('return all tools', done => {
            request
                .get('/tools')
                .set('Authorization', `Bearer ${bearerToken}`)
                .end((err, res) => {
                    expect(res.body).to.be.a('Array')
                    done(err)
                })
        })
    })
    
    describe('Route GET /tools{?tag}', () => {
        it('return tools filtering by TAG', done => {
            request
                .get('/tools')
                .set('Authorization', `Bearer ${bearerToken}`)
                .query({tags: 'node'})
                .end((err, res) => {
                    expect(res.body).to.be.a('Array')
                    done(err)
                })
        })
    })

    describe('Route DELETE /tools/{id}', () => {
        it('delete tool by ID', done => {
            request
                .delete(`/tools/${idCurenteTest}`)
                .set('Authorization', `Bearer ${bearerToken}`)
                .end((err, res) => {
                    expect(res.statusCode).to.be.eql(200)
                    done(err)
                })
        })
    })

    describe('Route DELETE /user/{id}', () => {
        it('delete user by ID', done => {
            request
                .delete(`/user/${idCurrentUser}`)
                .set('Authorization', `Bearer ${bearerToken}`)
                .end((err, res) => {
                    expect(res.statusCode).to.be.eql(200)
                    done(err)
                })
        })
    })

})