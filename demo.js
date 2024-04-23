const models = require("./models")

/*models.Activo.sync({ force: false })
models.Tag.sync({ force: false })
models.ActivoTags.sync({ force: false})*/

async function activosTagsDemo(id, tags) {
    try {
        const activo = await models.Activo.findOne({
            where: {
                id: id
            }
        })
    
        console.log("\n\nActivo:", activo.id, activo.numSerie, activo.descripcion)
        console.log("\n\nTags:")
    
        for (const t of tags) {
            const tag = await models.Tag.findOne({
                where: {
                    nombre: t
                }
            })
    
            // Relacionar tags con el activo.
            if (tag) {
                console.log("\n\n", tag.id, tag.nombre)
                await activo.addTag(tag)
            }
        }

        // Desplegar tags asociados desde la base de datos.
        const tagsAsociados = await activo.getTags()
        console.log("\n\n\nTags asociados:")
        tagsAsociados.forEach(tag => {
            console.log(tag.id, tag.nombre)
        });

        // Desplegar activo con un tag asociado.
        const tagLaptop = await models.Tag.findOne({ where: { nombre: "Laptop" }})
        const activosLaptop = await tagLaptop.getActivos()
        
        console.log("\n\n\nActivos de Laptop.")
        activosLaptop.forEach(activo => {
            console.log(activo.id, activo.numSerie, activo.numInventario, activo.descripcion)
        });
    } catch (error) {
        console.log(error)
    }
}

// 33: "Chromebook resistente con procesador dual-core, 4 GB de RAM y almacenamiento eMMC de 32 GB. Pantalla HD de 11 pulgadas, teclado resistente a derrames y sistema operativo Chrome OS."
activosTagsDemo(51, ["Laptop", "Computadora", "Chromebook"])