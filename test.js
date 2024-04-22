const activoModel = require("./models/modelos/activo-model.js")

const activos = activoModel.getAll()
activos.forEach(activo => {
    console.log(activo.id, activo.numSerie, activo.numInventario, activo.descripcion)
    // activo.dataValues -> objeto.
})