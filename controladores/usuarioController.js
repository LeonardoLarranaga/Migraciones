const models = require("../models")

const getAll = async function(_, response) {
    const usuarios = await models.Usuario.findAll()
    response.send(usuarios)
}

const getById = async function(request, response) {
    try {
        const usuario = await models.Usuario.findOne({
            where: {
                id: request.params.id
            }
        })
    
        if (usuario) response.json(usuario.dataValues)
        else response.status(404).send("Usuario no encontrado.")
    } catch (error) {
        response.status(500).send(`Error de Usuarios. ${error}`)
    }
}

const getByLogin = async function(request, response) {
    try {
        const usuario = await models.Usuario.findOne({
            where: {
                login: request.params.login
            }
        })
    
        if (usuario) response.json(usuario.dataValues)
        else response.status(404).send("Usuario no encontrado.")
    } catch (error) {
        response.status(500).send(`Error de Usuarios. ${error}`)
    }
}

const postUsuario = async function(request, response) {
    try {
        const usuario = await models.Usuario.create(request.body)

        if (usuario) response.status(201).send("Usuario creado.")
        else response.status(400).send("Usuario no creado.")
    } catch (error) {
        response.status(500).send(`Error de Usuarios. ${error}`)
    }
}

const deleteUsuario = async function (request, response) {
    try {
        const usuario = await models.Usuario.destroy({
            where: {
                id: request.params.id
            }
        })

        if (usuario) response.status(200).send("Usuario eliminado.")
        else response.status(404).send(`Usuario con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Error de Usuarios. ${error}`)
    }
}

const updateUsuario = async function(request, response) {
    try {
        const usuario = await models.Usuario.findOne({
            where: {
                id: request.params.id
            }
        })

        if (usuario) {
            await usuario.update(request.body)
            response.status(200).send('Usuario actualizado.');
        } else response.status(404).send(`Usuario con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Error de Usuarios. ${error}`)
    }
}

module.exports = {
    getAll, getById, getByLogin, 
    postUsuario,
    deleteUsuario,
    updateUsuario
}