const express = require("express")
const router = express.Router()
const controller = require("../controladores/ubicacionController.js")

router.get("/", controller.getAll)
router.get("/id/:id", controller.getById)
router.get("/:id/activos", controller.getAllActivos)

router.post("/", controller.postUbicacion)

router.delete("/:id", controller.deleteUbicacion)
router.delete("/:id/activos", controller.removeAllActivos)

router.put("/:id", controller.updateUbicacion)
router.patch("/:id", controller.updateUbicacion)
router.put("/:id/activo/:activoId", controller.addActivo)

module.exports = router