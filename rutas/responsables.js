const express = require("express")
const router = express.Router()
const controller = require("../controladores/responsableController.js")

// rutas GET de los responsables.
router.get("/", controller.getAll)
router.get("/id/:id", controller.getById)
router.get("/numeroEmpleado/:numeroEmpleado", controller.getByNumeroEmpleado)

router.post("/", controller.postResponsable)

router.delete("/:id", controller.deleteResponsable)

router.patch("/:id", controller.updateResponsable)
router.put("/:id", controller.updateResponsable)

module.exports = router