const express = require("express")
const router = express.Router()
const controller = require("../controladores/usuarioController.js")

router.get("/", controller.getAll)
router.get("/id/:id", controller.getById)
router.get("/login/:login", controller.getByLogin)

router.post("/", controller.postUsuario)

router.delete("/:id", controller.deleteUsuario)

router.patch("/:id", controller.updateUsuario)
router.put("/:id", controller.updateUsuario)


module.exports = router