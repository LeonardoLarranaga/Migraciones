const express = require("express")
const router = express.Router()
const controller = require("../controladores/tagController.js")
const { combineTableNames } = require("sequelize/lib/utils")

// rutas GET de los tags.
router.get("/", controller.getAll)
router.get("/id/:id", controller.getById)
router.get("/nombre/:nombre", controller.getByNombre)
router.get("/:id/activos", controller.getActivos)

// rutas POST de los tags.
router.post("/", controller.postTag)
router.post("/:id/activo/:activoId", controller.postTagActivo)

// rutas DELETE de los tags.
router.delete("/:id", controller.deleteTag)

// rutas PUT/PATCH de los tags.
router.patch("/:id", controller.updateTag)
router.put("/:id", controller.updateTag)

module.exports = router