const express = require("express")
const router = express.Router()
const controller = require("../controladores/ubicacionController.js")
const passport = require("../controladores/passportController.js")

// rutas GET de las ubicaciones.
router.get("/", passport.authenticate('jwt', { session: false }), controller.getAll)
router.get("/id/:id", passport.authenticate('jwt', { session: false }), controller.getById)
router.get("/:id/activos", passport.authenticate('jwt', { session: false }), controller.getAllActivos)

// rutas POST de las ubicaciones.
router.post("/", passport.authenticate('jwt', { session: false }), controller.postUbicacion)

// rutas DELETE de las ubicaciones.
router.delete("/:id", passport.authenticate('jwt', { session: false }), controller.deleteUbicacion)
router.delete("/:id/activos", passport.authenticate('jwt', { session: false }), controller.removeAllActivos)

// rutas PUT/PATCH de las ubicaciones.
router.put("/:id", passport.authenticate('jwt', { session: false }), controller.updateUbicacion)
router.patch("/:id", passport.authenticate('jwt', { session: false }), controller.updateUbicacion)
router.put("/:id/activo/:activoId", passport.authenticate('jwt', { session: false }), controller.addActivo)

module.exports = router