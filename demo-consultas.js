const models = require("./models")

async function consultar() {
    const activos = await models.Activo.findAll()
    console.log("\n\nActivos:\n\n")
    activos.forEach(activo => {
        console.log(activo.id, activo.numSerie, activo.numInventario, activo.descripcion)
        // activo.dataValues -> objeto.
    })

    console.log("\n\nUbicaciones:\n\n")
    const ubicaciones = await models.Ubicacion.findAll()
    ubicaciones.forEach(ubicacion => {
        console.log(ubicacion.id, ubicacion.descripcion)
    })
    
    console.log("\n\n\nTags:\n\n")
    const tags = await models.Tag.findAll()
    tags.forEach(tag => {
        console.log(tag.id, tag.nombre)  
    })

    console.log("\n\nResponsables:\n\n")
    const responsables = await models.Responsable.findAll()
    responsables.forEach(responsable => {
      console.log(responsable.id, responsable.numeroEmpleado, responsable.nombre)  
    })
}

consultar()