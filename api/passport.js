const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt
const { secretJwt } = require('../.env')

module.exports = app => {
    const params = {
        secretOrKey: secretJwt,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }
    const strategy = new Strategy(params, (payload, done) => {
        app.mysql('users')
            .where({ id: payload.id })
            .first()
            .then(user => done(null, user ? { ...payload } : false ))
            .catch(err => done(err, false))
    })

    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}