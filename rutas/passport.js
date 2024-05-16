const express = require("express")
const router = express.Router()
const controller = require("../controladores/passportController.js")

router.post("/google/", controller.iniciarSesionGoogle)


module.exports = router