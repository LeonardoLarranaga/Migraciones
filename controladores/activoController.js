const models = require("../models")

const getAll = async function(_, respond) {
    const activos = await models.Activo.findAll()
    respond.send(activos)
}

module.exports = { 
    getAll
}