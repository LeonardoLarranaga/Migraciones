const express = require("express")
const router = express.Router()
const controller = require("../controladores/ubicacionController.js")

router.get("/", controller.getAll)
router.get("/id/:id", controller.getById)

router.post("/", controller.postUbicacion)

router.delete("/:id", controller.deleteUbicacion)

router.put("/:id", controller.updateUbicacion)
router.patch("/:id", controller.updateUbicacion)

module.exports = router