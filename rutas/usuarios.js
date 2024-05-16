const express = require("express")
const router = express.Router()
const controller = require("../controladores/usuarioController.js")
const passport = require("../controladores/passportController.js")

// rutas GET de los usuarios.
//router.get("/", controller.getAll)
router.get("/", passport.authenticate('jwt', { session: false }), controller.getOne)

// rutas DELETE de los usuarios.
router.delete("/:token", controller.deleteUsuario)

// rutas PATCH/PUT de los usuarios.
router.patch("/:permisos/:pass", passport.authenticate('jwt', { session: false }), controller.updateUsuarioPermisos)

module.exports = router