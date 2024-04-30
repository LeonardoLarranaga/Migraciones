const models = require("../models")

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
        const activo = await models.Activo.create(request.body)
        if (activo) response.status(201).send({mensaje: "Activo creado.", activo: activo})
        else response.status(400).send(`Activo no creado. ${error.message}`)
    } catch (error) {
        response.status(400).send(`Activo no creado. ${error.message}`)
    }
}

const deleteActivo = async function (request, response) {
    try {
        const activoSafe = await models.Activo.findOne({
            where: {
                id: request.params.id
            }
        })

        const activo = await models.Activo.destroy({
            where: {
                id: request.params.id
            }
        })
        
        if (activo) {
            models.ActivoTags.destroy({
                where: {
                    activoId: activoSafe.id
                }
            })

            response.status(200).send("Activo eliminado.")
        }
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
            response.status(200).send({mensaje: "Activo modificado.", activo: activo})
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

const deleteAllActivoTags = async function (request, response) {
    try {
        const activo = await models.Activo.findOne({
            where: {
                id: request.params.id
            }
        })

        if (activo) {
            models.ActivoTags.destroy({
                where: {
                    activoId: activo.id
                }
            })

            response.status(200).send("ActivoTags eliminados.")
        } else response.status(404).send(`Activo con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Error de Activos. ${error}`)
    }
}
 
module.exports = {
    getAll, getById, getByNumSerie, getByNumInventario, getByResponsableId, getByTag, getByUbicacionId,
    postActivo,
    deleteActivo, deleteAllActivoTags,
    updateActivo,
    getTags, postActivoTag, deleteActivoTag
}