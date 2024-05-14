const models = require("../models")

// función para obtener todos los usuarios.
const getAll = async function(_, response) {
    const usuarios = await models.Usuario.findAll()
    response.send(usuarios)
}

// función para obtener un usuario por su login.
const getByEmail = async function(request, response) {
    try {
        const usuario = await models.Usuario.findOne({
            where: {
                email: request.params.email
            }
        })
    
        if (usuario) response.json(usuario.dataValues)
        else response.status(404).send("Usuario no encontrado.")
    } catch (error) {
        response.status(500).send(`Error de Usuarios. ${error}`)
    }
}

const getByToken = async function(request, response) {
    try {
        const usuario = await models.Usuario.findOne({
            where: {
                token: request.params.token
            }
        })

        if (usuario) response.json(usuario.dataValues)
        else response.status(404).send("Usuario no encontrado.")
    } catch (error) {
        response.status(500).send(`Error de Usuarios. ${error}`)
    }
}

// función para crear un usuario.
const postUsuario = async function(request, response) {
    try {
        const usuario = await models.Usuario.create(request.body)

        if (usuario) response.status(201).send({mensaje: "Usuario creado.", usuario: usuario})
        else response.status(400).send("Usuario no creado.")
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

// función para actualizar lso permisos de un usuario.
const updateUsuarioPermisos = async function(request, response) {
    try {
        if (request.params.pass != "backend") {
            response.status(403).send("Error de Usuarios. Contraseña incorrecta.")
            return
        }

        const usuario = await models.Usuario.findOne({
            where: {
                token: request.params.token
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
    getAll, getByEmail, getByToken,
    postUsuario,
    deleteUsuario,
    updateUsuarioPermisos
}