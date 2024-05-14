const models = require("../models")

// función para obtener todos los tags.
const getAll = async function(request, response) {
    if (!request.user.permisos.includes("r")) return response.status(403).send("Usuario no autorizado.")

    const tags = await models.Tag.findAll()
    response.send(tags)
}

// función para obtener un tag por su Id.
const getById = async function(request, response) {
    if (!request.user.permisos.includes("r")) return response.status(403).send("Usuario no autorizado.")

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

// función par aobtener un tag por su nombre.
const getByNombre = async function(request, response) {
    if (!request.user.permisos.includes("r")) return response.status(403).send("Usuario no autorizado.")

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

// función para crear un nuevo tag.
const postTag = async function(request, response) {
    if (!request.user.permisos.includes("w")) return response.status(403).send("Usuario no autorizado.")

    try {
        const tag = await models.Tag.create(request.body)

        if (tag) response.status(201).send({mensaje:"Tag creado.", tag: tag})
        else response.status(400).send("Tag no creado.")
    } catch (error) {
        response.status(500).send(`Error de Tags. ${error}`)
    }
}

// función para eliminar un tag.
const deleteTag = async function (request, response) {
    if (!request.user.permisos.includes("w")) return response.status(403).send("Usuario no autorizado.")

    try {
        const tag = await models.Tag.findOne({
            where: {
                id: request.params.id
            }
        })

        if (tag) {
            await models.ActivoTags.destroy({
                where: {
                    tagId: tag.id
                }
            })
            await tag.destroy()
            response.status(200).send("Tag eliminado.")
        }
        else response.status(404).send(`Tag con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Error de Tags. ${error}`)
    }
}

// función para actualizar un tag.
const updateTag = async function(request, response) {
    if (!request.user.permisos.includes("w")) return response.status(403).send("Usuario no autorizado.")

    try {
        const tag = await models.Tag.findOne({
            where: {
                id: request.params.id
            }
        })

        if (tag) {
            await tag.update(request.body)
            response.status(200).send({mensaje: 'Tag actualizado.', tag: tag});
        } else response.status(404).send(`Tag con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Error de Tags. ${error}`)
    }
}

// función para obtener los activos de un tag.
const getActivos = async function(request, response) {
    if (!request.user.permisos.includes("r")) return response.status(403).send("Usuario no autorizado.")

    try {
        const tag = await models.Tag.findOne({
            where: {
                id: request.params.id
            }
        })

        if (tag) {
            const activos = await tag.getActivos()
            response.status(200).send(activos)
        } else response.status(404).send(`Tag con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Error de Tags. ${error}`)
    }
}

// función para crear una relación activo-tag
const postTagActivo = async function (request, response) {
    if (!request.user.permisos.includes("w")) return response.status(403).send("Usuario no autorizado.")

    try {
        const tag = await models.Tag.findOne({
            where: {
                id: request.params.id
            }
        })

        if (tag) {
            const activo = await models.Activo.findOne({
                where: {
                    id: request.params.activoId
                }
            })

            if (activo) {
                await tag.addActivo(activo)
                response.status(200).send(`Tag ${tag.id} relacionado con Activo ${activo.id}.`)
            } else response.status(404).send(`Activo con Id ${request.params.activoId} no existe.`)

        } else response.status(404).send(`Tag con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Error de Tags. ${error}`)
    }
}

// función para remover todos los activos-tags.
const removeAllActivoTags = async function (request, response) {
    if (!request.user.permisos.includes("w")) return response.status(403).send("Usuario no autorizado.")

    try {
       await models.ActivoTags.destroy({
            where: {
                tagId: request.params.id
            }
        })

        response.status(200).send(`Activos de Tag ${request.params.id} eliminados.`)
    } catch (error) {
        response.status(500).send(`Error de Tags. ${error}`)
    }
}

module.exports = {
    getAll, getById, getByNombre,
    postTag,
    deleteTag, removeAllActivoTags,
    updateTag,
    getActivos, postTagActivo
}