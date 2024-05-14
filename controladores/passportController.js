const passport = require('passport')
const ExtractJwt = require('passport-jwt').ExtractJwt
const JWTStrategy = require('passport-jwt').Strategy
const jwt = require('jsonwebtoken')

const models = require('../models')

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = "BACK_END"

passport.use(new JWTStrategy(options, async function(payload, done) {
    const usuario = await models.Usuario.findOne({
        where: {
            email: payload.decodedToken.email
        }
    })

    if (usuario) done(null, usuario)
    else done(null, false)
}))

passport.crearTokenJWT = async function(request, response) {
    try {
        const decodedToken = jwt.decode(request.body.credential)
        const jwtToken = jwt.sign({decodedToken}, "BACK_END")
        response.status(200).send(jwtToken)
    } catch (error) {
        response.status(500).send(`Error creando token. ${error}`)
    }
}


module.exports = passport