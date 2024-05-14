const express = require("express")
const https = require("https")
const fs = require("fs")
const cors = require("cors")
const passport = require('passport')

const app = express()

app.use(cors())
app.use(require("body-parser").json({ limit: "100000gb"} ))
app.use(passport.initialize())

const port = 4000

const activos = require("./rutas/activos.js")
const responsables = require("./rutas/responsables.js")
const ubicaciones = require("./rutas/ubicaciones.js")
const usuarios = require("./rutas/usuarios.js")
const tags = require("./rutas/tags.js")
const passportRutas = require('./rutas/passport.js')

const credenciales = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cer")
}

// se inicia el servidor.
const server = https.createServer(credenciales, app)

server.listen(port, () => {
    console.log(`Servidor escuchando por el puerto: https://localhost:${port}`)
}).on("error", error => {
    console.log("Error al iniciar el servidor:", error)
})

// página principal del app.
app.get("/", (_, respond) => {
    respond.send("Sistema de control de activos.")
})

// usamos express.json() para poder procesar los request en donde su body contiene un json.
app.use(express.json())

app.use("/activo", activos)
app.use("/responsable", responsables)
app.use("/ubicacion", ubicaciones)
app.use("/usuario", usuarios)
app.use("/tag", tags)
app.use('/passport', passportRutas)