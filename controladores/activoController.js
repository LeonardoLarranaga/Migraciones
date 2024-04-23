const e = require("express")
const models = require("../models")
const { param } = require("../rutas/tags")

// función para obtener todos los activos.
const getAll = async function (_, response) {
    const activos = await models.Activo.findAll()
    response.send(activos)
}

// función para obtener un activo mediante su Id.
const getById = async function (request, response) {
    const activo = await models.Activo.findOne({
        where: {
            id: request.params.id
        }
    })

    if (activo) response.json(activo.dataValues)
    else response.status(404).send("Activo no encontrado.")
}

// función para obtener un activo mediante su serie.
const getByNumSerie = async function (request, response) {
    const activo = await models.Activo.findOne({
        where: {
            numSerie: request.params.numSerie
        }
    })

    if (activo) response.json(activo.dataValues)
    else response.status(404).send("Activo no encontrado.")
}

// función para obtener una activo mediante su número de inventario.
const getByNumInventario = async function (request, response) {
    const activo = await models.Activo.findOne({
        where: {
            numInventario: request.params.numInventario
        }
    })

    if (activo) response.json(activo.dataValues)
    else response.status(404).send("Activo no encontrado.")
}

const getByResponsableId = async function (request, response) {
    const activos = await models.Activo.findAll({
        where: {
            responsableId: request.params.responsableId
        }
    })

    if (activos) response.send(activos)
    else response.status(404).send("Activos no encontrados.")
}

const getByTag = async function (request, response) {
    const tag = await models.Tag.findOne({
        where: {
            nombre: request.params.tag
        }
    })

    if (tag) {
        const activos = await tag.getActivos()

        if (activos) response.send(activos)
        else response.status(404).send(`Tag ${tag.nombre} no tiene activos.`)

    } else response.status(404).send("Tag no encontrado.")
}

const getByUbicacionId = async function (request, response) {
    const activos = await models.Activo.where({
        ubicacionId: request.params.ubicacionId
    })

    if (activos) response.send(activos)
    else response.status(404).send("Activos no encontrados.")
}

const postActivo = async function (request, response) {
    try {
        const body = {...request.body}; delete body.responsableId; delete body.ubicacionId
        const activo = await models.Activo.build(body)

        let mensajeError = ""

        if (request.body.responsableId) {
            const responsable = await models.Responsable.findOne({
                where: {
                    id: request.body.responsableId
                }
            })

            if (responsable) responsable.addActivo(activo)
            else mensajeError += `Responsable con Id ${request.body.responsableId} no existe. `
        }

        if (request.body.ubicacionId) {
            const ubicacion = await models.Ubicacion.findOne({
                where: {
                    id: request.body.ubicacionId
                }
            })

            if (ubicacion) ubicacion.addActivo(activo)
            else mensajeError += `Responsable con Id ${request.body.responsableId} no existe.`
        }

        if (mensajeError.length == 0) response.status(201).send("Activo creado.")
        else response.status(404).send(mensajeError)
    } catch (error) {
        response.status(400).send(`Activo no creado. ${error.message}`)
    }
}

const deleteActivo = async function (request, response) {
    try {
        const activo = await models.Activo.destroy({
            where: {
                id: request.params.id
            }
        })

        if (activo) response.status(200).send("Activo eliminado.")
        else response.status(404).send(`Activo con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Activo no eliminado. ${error}`)
    }
}

const updateActivo = async function (request, response) {
    try {
        const activo = await models.Activo.findOne({
            where: {
                id: request.params.id
            }
        })

        if (activo) {
            await activo.update(request.body)
            response.status(200).send('Activo actualizado.');
        } else response.status(404).send(`Activo con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Activo no modificado. ${error}`)
    }
}

const getTags = async function (request, response) {
    try {
        const activo = await models.Activo.findOne({
            where: {
                id: request.params.id
            }
        })

        if (activo) {
            const tags = await activo.getTags()
            response.status(200).send(tags);
        } else response.status(404).send(`Activo con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Error de Activos. ${error}`)
    }
}

const postActivoTag = async function (request, response) {
    try {
        const activo = await models.Activo.findOne({
            where: {
                id: request.params.id
            }
        })

        if (activo) {
            const tag = await models.Tag.findOne({
                where: {
                    id: request.params.tagId
                }
            })

            if (tag) {
                await activo.addTag(tag)
                response.status(200).send(`Activo ${activo.id} relacionado con Tag ${tag.id}.`)
            } else response.status(404).send(`Tag con Id ${request.params.tagId} no existe.`)

        } else response.status(404).send(`Activo con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Error de Activos. ${error}`)
    }
}

const deleteActivoTag = async function (request, response) {
    try {
        const activo = await models.Activo.findOne({
            where: {
                id: request.params.id
            }
        })

        if (activo) {
            const tag = await models.Tag.findOne({
                where: {
                    id: request.params.tagId
                }
            })

            if (tag) {
                await activo.removeTag(tag)
                response.status(200).send(`Relación de Activo ${activo.id} con Tag ${tag.id} eliminada.`)
            } else response.status(404).send(`Tag con Id ${request.params.tagId} no existe.`)

        } else response.status(404).send(`Activo con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Error de Activos. ${error}`)
    }
}

module.exports = {
    getAll, getById, getByNumSerie, getByNumInventario, getByResponsableId, getByTag, getByUbicacionId,
    postActivo,
    deleteActivo,
    updateActivo,
    getTags, postActivoTag, deleteActivoTag
}