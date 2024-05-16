const models = require("../models")
const dotenv = require('dotenv')
dotenv.config('.env')

// función para obtener todos los usuarios.
const getAll = async function(_, response) {
    const usuarios = await models.Usuario.findAll()
    response.send(usuarios)
}

// función para obtener un usuario por su email.
const getOne = async function(request, response) {
    if (!request.user.permisos.includes("r")) return response.status(403).send("Usuario no autorizado.")

    try {
        const usuario = await models.Usuario.findOne({
            where: {
                email: request.user.email
            }
        })
    
        if (usuario) response.json(usuario.dataValues)
        else response.status(404).send("Usuario no encontrado.")
    } catch (error) {
        response.status(500).send(`Error de Usuarios. ${error}`)
    }
}

// función para eliminar un usuario.
const deleteUsuario = async function (request, response) {
    try {
        const usuario = await models.Usuario.destroy({
            where: {
                token: request.params.token
            }
        })

        if (usuario) response.status(200).send("Usuario eliminado.")
        else response.status(404).send(`Usuario con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Error de Usuarios. ${error}`)
    }
}

// función para actualizar los permisos de un usuario.
const updateUsuarioPermisos = async function(request, response) {
    try {
        if (request.params.pass != process.env.VITE_CHANGE_PERMISSIONS_SECRET) 
            return response.status(403).send("Error de Usuarios. Contraseña incorrecta.")

        const usuario = await models.Usuario.findOne({
            where: {
                email: request.user.email
            }
        })
        
        if (usuario) {
            usuario.permisos = request.params.permisos
            await usuario.update({ permisos: request.params.permisos })
            await usuario.save()
            response.status(200).send(usuario.dataValues)
        } else response.status(404).send("Usuario no encontrado.")
    } catch (error) {
        response.status(500).send(`Error de Usuarios. ${error}`)
    }
}

module.exports = {
    getAll, getOne,
    deleteUsuario,
    updateUsuarioPermisos
}