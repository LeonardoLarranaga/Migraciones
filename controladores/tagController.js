const models = require("../models")

const getAll = async function(_, response) {
    const tags = await models.Tag.findAll()
    response.send(tags)
}

const getById = async function(request, response) {
    try {
        const tag = await models.Tag.findOne({
            where: {
                id: request.params.id
            }
        })
    
        if (tag) response.json(tag.dataValues)
        else response.status(404).send("Tag no encontrado.")
    } catch (error) {
        response.status(500).send(`Error de Tags. ${error}`)
    }
}

const getByNombre = async function(request, response) {
    try {
        const tag = await models.Tag.findOne({
            where: {
                nombre: request.params.nombre
            }
        })
    
        if (tag) response.json(tag.dataValues)
        else response.status(404).send("Tag no encontrado.")
    } catch (error) {
        response.status(500).send(`Error de Tags. ${error}`)
    }
}

const postTag = async function(request, response) {
    try {
        const tag = await models.Tag.create(request.body)

        if (tag) response.status(201).send("Tag creado.")
        else response.status(400).send("Tag no creado.")
    } catch (error) {
        response.status(500).send(`Error de Tags. ${error}`)
    }
}

const deleteTag = async function (request, response) {
    try {
        const tag = await models.Tag.destroy({
            where: {
                id: request.params.id
            }
        })

        if (tag) response.status(200).send("Tag eliminado.")
        else response.status(404).send(`Tag con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Error de Tags. ${error}`)
    }
}

const updateTag = async function(request, response) {
    try {
        const tag = await models.Tag.findOne({
            where: {
                id: request.params.id
            }
        })

        if (tag) {
            await tag.update(request.body)
            response.status(200).send('Tag actualizado.');
        } else response.status(404).send(`Tag con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Error de Tags. ${error}`)
    }
}

module.exports = {
    getAll, getById, getByNombre,
    postTag,
    deleteTag,
    updateTag
}