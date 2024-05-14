const express = require("express")
const router = express.Router()
const controller = require("../controladores/passportController.js")

router.post("/crearJWT/", controller.crearTokenJWT)

module.exports = router