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
        else response.status(404).send("Responsable no encontrado.")
    } catch (error) {
        response.status(500).send(`Error de Responsables. ${error}`)
    }
}

const postResponsable = async function(request, response) {
    try {
        const responsable = await models.Responsable.create(request.body)
        if (responsable) response.status(201).send({mensaje: "Responsable creado.", responsable: responsable})
        else response.status(400).send("Responsable no creado.")
    } catch (error) {
        response.status(500).send(`Error de responsables. ${error}`)
    }
}

const deleteResponsable = async function (request, response) {
    try {
        const responsable = await models.Responsable.findOne({
            where: {
                id: request.params.id
            }
        })

        if (responsable) {
            await models.Activo.update({ responsableId: null }, { 
                where: { 
                    responsableId: responsable.id 
                } });
                
            await responsable.destroy()
            response.status(200).send("Responsable eliminado.")
        }
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
            response.status(200).send({mensaje: 'Responsable actualizado.', responsable: responsable});
        } else response.status(404).send(`Responsable con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Error de responsables. ${error}`)
    }
}

const getAllActivos = async function(request, response) {
    try {
        const responsable = await models.Responsable.findOne({
            where: {
                id: request.params.id
            }
        })
    
        if (responsable) {
            const activos = await responsable.getActivos()
            response.status(200).send(activos)
        } else response.status(404).send(`Responsable con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Error de Responsables. ${error}`)
    }
}

const removeActivo = async function(request, response) {
    try {
        const responsable = await models.Responsable.findOne({
            where: {
                id: request.params.id
            }
        })
    
        if (responsable) {
            const activo = await models.Activo.findOne({
                where: {
                    id: request.params.activoId
                }
            })

            if (activo) {
                activo.responsableId = null
                activo.save()
                response.status(200).send(`Activo ${activo.id} quitado de Responsable ${responsable.id}.`)
            } else response.status(404).send(`Activo con Id ${request.params.activoId} no existe.`)
        } else response.status(404).send(`Responsable con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Error de Responsables. ${error}`)
    } 
}

const removeAllActivos = async function(request, response) {
try {
        const responsable = await models.Responsable.findOne({
            where: {
                id: request.params.id
            }
        })
    
        if (responsable) {
            await models.Activo.update({ responsableId: null }, { 
                where: { 
                    responsableId: responsable.id 
                } });

            response.status(200).send(`Activos de Responsable ${responsable.id} desvinculados.`)
        } else response.status(404).send(`Responsable con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Error de Responsables. ${error}`)
    } 
}

const addActivo = async function(request, response) {
    try {
        const responsable = await models.Responsable.findOne({
            where: {
                id: request.params.id
            }
        })
    
        if (responsable) {
            const activo = await models.Activo.findOne({
                where: {
                    id: request.params.activoId
                }
            })

            if (activo) {
                activo.responsableId = responsable.id
                activo.save()
                response.status(200).send(`Activo ${activo.id} conectado a Responsable ${responsable.id}.`)
            } else response.status(404).send(`Activo con Id ${request.params.activoId} no existe.`)
        } else response.status(404).send(`Responsable con Id ${request.params.id} no existe.`)
    } catch (error) {
        response.status(500).send(`Error de Responsables. ${error}`)
    } 
}

module.exports = {
    getAll, getById, getByNumeroEmpleado, getAllActivos,
    postResponsable,
    deleteResponsable, removeActivo, removeAllActivos,
    updateResponsable, addActivo
}