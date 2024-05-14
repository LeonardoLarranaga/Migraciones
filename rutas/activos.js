const express = require("express")
const router = express.Router()
const controller = require("../controladores/activoController.js")
const passport = require("../controladores/passportController.js")

// rutas GET de los activos.

router.get("/", passport.authenticate('jwt', { session: false }), controller.getAll)
router.get("/id/:id", passport.authenticate('jwt', { session: false }), controller.getById)
router.get("/numSerie/:numSerie", passport.authenticate('jwt', { session: false }), controller.getByNumSerie)
router.get("/numInventario/:numInventario", passport.authenticate('jwt', { session: false }), controller.getByNumInventario)
router.get("/responsableId/:responsableId", passport.authenticate('jwt', { session: false }), controller.getByResponsableId)
router.get("/:id/tags", passport.authenticate('jwt', { session: false }), controller.getTags)


// rutas POST de los activos.
router.post("/", passport.authenticate('jwt', { session: false }), controller.postActivo)
router.post("/:id/tag/:tagId", passport.authenticate('jwt', { session: false }), controller.postActivoTag)

// rutas DELETE de los activos.
router.delete("/:id", passport.authenticate('jwt', { session: false }), controller.deleteActivo)
router.delete("/:id/tag/:tagId", passport.authenticate('jwt', { session: false }), controller.deleteActivoTag)
router.delete("/:id/tag/", passport.authenticate('jwt', { session: false }), controller.deleteAllActivoTags)

// rutas PUT de los activos.
router.put("/:id", passport.authenticate('jwt', { session: false }), controller.updateActivo)

// rutas PATCH de los activos.
router.patch("/:id", passport.authenticate('jwt', { session: false }), controller.updateActivo)

module.exports = router
