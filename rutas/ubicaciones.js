const express = require("express")
const router = express.Router()
const controller = require("../controladores/ubicacionController.js")

// rutas GET de las ubicaciones.
router.get("/", controller.getAll)
router.get("/id/:id", controller.getById)
router.get("/:id/activos", controller.getAllActivos)

// rutas POST de las ubicaciones.
router.post("/", controller.postUbicacion)

// rutas DELETE de las ubicaciones.
router.delete("/:id", controller.deleteUbicacion)
router.delete("/:id/activos", controller.removeAllActivos)

// rutas PUT/PATCH de las ubicaciones.
router.put("/:id", controller.updateUbicacion)
router.patch("/:id", controller.updateUbicacion)
router.put("/:id/activo/:activoId", controller.addActivo)

module.exports = router