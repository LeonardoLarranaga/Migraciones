const express = require("express")
const router = express.Router()
const controller = require("../controladores/responsableController.js")
const passport = require("../controladores/passportController.js")

// rutas GET de los responsables.
router.get("/", passport.authenticate('jwt', { session: false }), controller.getAll)
router.get("/id/:id", passport.authenticate('jwt', { session: false }), controller.getById)
router.get("/numeroEmpleado/:numeroEmpleado", passport.authenticate('jwt', { session: false }), controller.getByNumeroEmpleado)
router.get("/:id/activos", passport.authenticate('jwt', { session: false }), controller.getAllActivos)

// rutas POST de los responsables.
router.post("/", passport.authenticate('jwt', { session: false }), controller.postResponsable)

// rutas DELETE de los responsables.

router.delete("/:id", passport.authenticate('jwt', { session: false }), controller.deleteResponsable)
router.delete("/:id/activo/:activoId", passport.authenticate('jwt', { session: false }), controller.removeActivo)
router.delete("/:id/activos", passport.authenticate('jwt', { session: false }), controller.removeAllActivos)

// rutas PATCH/PUT de los responsables.
router.patch("/:id", passport.authenticate('jwt', { session: false }), controller.updateResponsable)
router.put("/:id", passport.authenticate('jwt', { session: false }), controller.updateResponsable)
router.put("/:id/activo/:activoId", passport.authenticate('jwt', { session: false }), controller.addActivo)

module.exports = router