const express = require("express")
const router = express.Router()
const controller = require("../controladores/usuarioController.js")

// rutas GET de los usuarios.
router.get("/", controller.getAll)
router.get("/id/:id", controller.getById)
router.get("/login/:login", controller.getByLogin)

// rutas POST de los usuarios.
router.post("/", controller.postUsuario)

// rutas DELETE de los usuarios.
router.delete("/:id", controller.deleteUsuario)

// rutas PATCH/PUT de los usuarios.
router.patch("/:id", controller.updateUsuario)
router.put("/:id", controller.updateUsuario)


module.exports = router