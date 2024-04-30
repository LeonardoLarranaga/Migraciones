const models = require("../models")

// función para obtener todos las ubicaciones.
const getAll = async function (_, response) {
    const ubicaciones = await models.Ubicacion.findAll()
    response.send(ubicaciones)
}

// función para obtener una ubicación por su Id.
const getById = async function (request, response) {
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

// función para crear una ubicación.
const postUbicacion = async function (request, response) {
    try {
        const ubicacion = await models.Ubicacion.create(request.body)

        if (ubicacion) response.status(201).send({ mensaje: "Ubicación creada.", ubicacion: ubicacion })
        else response.status(400).send("Ubicación no creada.")
    } catch (error) {
        response.status(500).send(`Error de Ubicaciones. ${error}`)
    }
}

// función para elimianr una ubicación.
const deleteUbicacion = async function (request, response) {
    try {
        const ubicacion = await models.Ubicacion.findOne({
            where: {
                id: request.params.id
            }
        })

        if (ubicacion) {
            await models.Activo.update({ ubicacionId: null }, { 
                where: { 
                    ubicacionId: ubicacion.id 
                } });
                
            await ubicacion.destroy()
            response.status(200).send("Ubicación eliminada.")
        }
        else response.status(404).send(`Ubicación con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Error de Ubicaciones. ${error}`)
    }
}

// función para actualizar una ubicación.
const updateUbicacion = async function (request, response) {
    try {
        const ubicacion = await models.Ubicacion.findOne({
            where: {
                id: request.params.id
            }
        })

        if (ubicacion) {
            await ubicacion.update(request.body)
            response.status(200).send({mensaje: 'Ubicación actualizada.', ubicacion: ubicacion});
        } else response.status(404).send(`Ubicación con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Error de Ubicaciones. ${error}`)
    }
}

// función para remover los activos de una ubicación.
const removeAllActivos = async function (request, response) {
    try {
        const ubicacion = await models.Ubicacion.findOne({
            where: {
                id: request.params.id
            }
        })

        if (ubicacion) {
            await models.Activo.update({ ubicacionId: null }, {
                where: {
                    ubicacionId: ubicacion.id
                }
            });

            response.status(200).send(`Activos de Ubicación ${ubicacion.id} desvinculados.`)
        } else response.status(404).send(`Ubicación con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Error de Ubicaciones. ${error}`)
    }
}

// función para añadir un activo a una ubicación.
const addActivo = async function(request, response) {
    try {
        const ubicacion = await models.Ubicacion.findOne({
            where: {
                id: request.params.id
            }
        })
    
        if (ubicacion) {
            const activo = await models.Activo.findOne({
                where: {
                    id: request.params.activoId
                }
            })

            if (activo) {
                activo.ubicacionId = ubicacion.id
                activo.save()
                response.status(200).send(`Activo ${activo.id} conectado a Ubicación ${ubicacion.id}.`)
            } else response.status(404).send(`Activo con Id ${request.params.activoId} no existe.`)
        } else response.status(404).send(`Ubicación con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Error de Ubicaciones. ${error}`)
    } 
}

// función para obtener todos los activos de un tag.
const getAllActivos = async function(request, response) {
    try {
        const ubicacion = await models.Ubicacion.findOne({
            where: {
                id: request.params.id
            }
        })

        if (ubicacion) {
            const activos = await models.Activo.findAll({
                where: {
                    ubicacionId: ubicacion.id
                }
            })
            response.status(200).send(activos)
        } else response.status(404).send(`Ubicación con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Error de Ubicaciones. ${error}`)
    }
}

module.exports = {
    getAll, getById, getAllActivos,
    postUbicacion,
    deleteUbicacion, removeAllActivos,
    updateUbicacion, addActivo
}