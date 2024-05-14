const express = require("express")
const router = express.Router()
const controller = require("../controladores/usuarioController.js")

// rutas GET de los usuarios.
router.get("/", controller.getAll)
router.get("/email/:email", controller.getByEmail)
router.get("/token/:token", controller.getByToken)

// rutas POST de los usuarios.
router.post("/", controller.postUsuario)

// rutas DELETE de los usuarios.
router.delete("/:token", controller.deleteUsuario)

// rutas PATCH/PUT de los usuarios.
router.patch("/:token/:permisos/:pass", controller.updateUsuarioPermisos)


module.exports = router