const models = require("../models")

// función para obtener todos las ubicaciones.
const getAll = async function(_, response) {
    const ubicaciones = await models.Ubicacion.findAll()
    response.send(ubicaciones)
}

const getById = async function(request, response) {
    try {
        const ubicacion = await models.Ubicacion.findOne({
            where: {
                id: request.params.id
            }
        })
    
        if (ubicacion) response.json(ubicacion.dataValues)
        else response.status(404).send("Ubicación no encontrada.")
    } catch (error) {
        response.status(500).send(`Error de Ubicaciones. ${error}`)
    }
}

const postUbicacion = async function(request, response) {
    try {
        const ubicacion = await models.Ubicacion.create(request.body)

        if (ubicacion) response.status(201).send("Ubicación creada.")
        else response.status(400).send("Ubicación no creada.")
    } catch (error) {
        response.status(500).send(`Error de Ubicaciones. ${error}`)
    }
}

const deleteUbicacion = async function (request, response) {
    try {
        const ubicacion = await models.Ubicacion.destroy({
            where: {
                id: request.params.id
            }
        })

        if (ubicacion) response.status(200).send("Ubicación eliminada.")
        else response.status(404).send(`Ubicación con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Error de Ubicaciones. ${error}`)
    }
}

const updateUbicacion = async function(request, response) {
    try {
        const ubicacion = await models.Ubicacion.findOne({
            where: {
                id: request.params.id
            }
        })

        if (ubicacion) {
            await ubicacion.update(request.body)
            response.status(200).send('Ubicación actualizada.');
        } else response.status(404).send(`Ubicación con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Error de Ubicaciones. ${error}`)
    }
}

module.exports = {
    getAll, getById,
    postUbicacion,
    deleteUbicacion,
    updateUbicacion
}