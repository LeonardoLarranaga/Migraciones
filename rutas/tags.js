const express = require("express")
const router = express.Router()
const controller = require("../controladores/tagController.js")
const passport = require("../controladores/passportController.js")

// rutas GET de los tags.
router.get("/", passport.authenticate('jwt', { session: false }), controller.getAll)
router.get("/id/:id", passport.authenticate('jwt', { session: false }), controller.getById)
router.get("/nombre/:nombre", passport.authenticate('jwt', { session: false }), controller.getByNombre)
router.get("/:id/activos", passport.authenticate('jwt', { session: false }), controller.getActivos)

// rutas POST de los tags.
router.post("/", passport.authenticate('jwt', { session: false }), controller.postTag)
router.post("/:id/activo/:activoId", passport.authenticate('jwt', { session: false }), controller.postTagActivo)

// rutas DELETE de los tags.
router.delete("/:id", passport.authenticate('jwt', { session: false }), controller.deleteTag)
router.delete("/:id/activos", passport.authenticate('jwt', { session: false }), controller.removeAllActivoTags)

// rutas PUT/PATCH de los tags.
router.patch("/:id", passport.authenticate('jwt', { session: false }), controller.updateTag)
router.put("/:id", passport.authenticate('jwt', { session: false }), controller.updateTag)

module.exports = router