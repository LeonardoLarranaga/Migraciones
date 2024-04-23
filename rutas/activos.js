const express = require("express")
const router = express.Router()
const controller = require("../controladores/activoController.js")

// rutas GET de los activos.
router.get("/", controller.getAll)
router.get("/id/:id", controller.getById)
router.get("/numSerie/:numSerie", controller.getByNumSerie)
router.get("/numInventario/:numInventario", controller.getByNumInventario)
router.get("/responsableId/:responsableId", controller.getByResponsableId)
router.get("/tag/:tag", controller.getByTag)
router.get("/ubicacionId/:ubicacionId", controller.getByUbicacionId)

// rutas POST de los activos.
router.post("/", controller.postActivo)

// rutas DELETE de los activos.
router.delete("/:id", controller.deleteActivo)

// rutas PUT de los activos.
router.put("/:id", controller.updateActivo)

// rutas PATCH de los activos.
router.patch("/:id", controller.updateActivo)

module.exports = router
