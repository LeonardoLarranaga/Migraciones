const passport = require('passport')
const ExtractJwt = require('passport-jwt').ExtractJwt
const JWTStrategy = require('passport-jwt').Strategy
const jwt = require('jsonwebtoken')

const models = require('../models')

const dotenv = require('dotenv')
dotenv.config('.env')

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.VITE_CLIENT_ID_GOOGLE) 
 
const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = process.env.VITE_SECRET

passport.use(new JWTStrategy(options, async function(payload, done) {
    const usuario = await models.Usuario.findOne({
        where: {
            email: payload.decodedToken.email
        }
    })

    if (usuario) done(null, usuario)
    else done(null, false)
}))

passport.iniciarSesionGoogle = async function(request, response) {
    const googleUser = request.body.googleUser
    if (!googleUser) return response.status(400).send("Usuario de Google inválido.")

    const userVerificado = await verificarGoogleUser(googleUser.credential)
    if (!userVerificado) return response.status(401).send("Usuario de Google no autorizado.")

    const tokenJWT = await crearTokenJWT(googleUser)
    const usuario = await obtenerUsuarioBD(userVerificado.payload)
    if (!usuario || !tokenJWT) response.status(500).send("Error de servidor.")
    
    response.status(200).send({
        user: {
            name: userVerificado.payload.name,
            email: userVerificado.payload.email,
            image: userVerificado.payload.picture
        },

        token: tokenJWT
    })
}

async function crearTokenJWT(googleUser) {
    try {
        const decodedToken = jwt.decode(googleUser.credential)
        const jwtToken = jwt.sign({decodedToken}, process.env.VITE_SECRET, { expiresIn: '1d' })
        return jwtToken
    } catch {
        return null
    }
}

async function verificarGoogleUser(credential) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.VITE_CLIENT_ID_GOOGLE
        })

        return ticket
    } catch (error) {
        console.log(error)
        return null
    }
}

async function obtenerUsuarioBD(userVerificado) {
    const usuario = await models.Usuario.findOrCreate({
        where: {
            email: userVerificado.email
        },
        
        defaults: {
            permisos: "r"
        }
    })

    return usuario
}

module.exports = passport