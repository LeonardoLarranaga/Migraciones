const express = require("express")
const router = express.Router()
const controller = require("../controladores/activoController.js")

router.get("/", controller.getAll)

module.exports = router
