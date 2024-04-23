const express = require("express")
const router = express.Router()
const controller = require("../controladores/tagController.js")
const { combineTableNames } = require("sequelize/lib/utils")

router.get("/", controller.getAll)
router.get("/id/:id", controller.getById)
router.get("/nombre/:nombre", controller.getByNombre)

router.post("/", controller.postTag)

router.delete("/:id", controller.deleteTag)

router.patch("/:id", controller.updateTag)
router.put("/:id", controller.updateTag)

module.exports = router