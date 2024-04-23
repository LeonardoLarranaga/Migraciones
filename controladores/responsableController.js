const models = require("../models")

// función para obtener todos los responsables.
const getAll = async function(_, response) {
    const responsables = await models.Responsable.findAll()
    response.send(responsables)
}

// función para obtener un responsable mediante su Id.
const getById = async function(request, response) {
    try {
        const responsable = await models.Responsable.findOne({
            where: {
                id: request.params.id
            }
        })
    
        if (responsable) response.json(responsable.dataValues)
        else response.status(404).send("Responsable no encontrado.")
    } catch (error) {
        response.status(500).send(`Error de Responsables. ${error}`)
    }
}

// función para obtener un responsable mediante su número de empleado.
const getByNumeroEmpleado = async function(request, response) {
    try {
        const responsable = await models.Responsable.findOne({
            where: {
                numeroEmpleado: request.params.numeroEmpleado
            }
        })
    
        if (responsable) response.json(responsable.dataValues)
        else response.status(404).send("Activo no encontrado.")
    } catch (error) {
        response.status(500).send(`Error de Responsables. ${error}`)
    }
}

const postResponsable = async function(request, response) {
    try {
        const responsable = await models.Responsable.create(request.body)

        if (responsable) response.status(201).send("Activo creado.")
        else response.status(400).send("Activo no creado.")
    } catch (error) {
        response.status(500).send(`Error de responsables. ${error}`)
    }
}

const deleteResponsable = async function (request, response) {
    try {
        const responsable = await models.Responsable.destroy({
            where: {
                id: request.params.id
            }
        })

        if (responsable) response.status(200).send("Responsable eliminado.")
        else response.status(404).send(`Responsable con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Error de responsables. ${error}`)
    }
}

const updateResponsable = async function(request, response) {
    try {
        const responsable = await models.Responsable.findOne({
            where: {
                id: request.params.id
            }
        })

        if (responsable) {
            await responsable.update(request.body)
            response.status(200).send('Responsable actualizado.');
        } else response.status(404).send(`Responsable con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Error de responsables. ${error}`)
    }
}

module.exports = {
    getAll, getById, getByNumeroEmpleado,
    postResponsable,
    deleteResponsable,
    updateResponsable
}