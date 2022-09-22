const express = require("express")
const cookieParser = require("cookie-parser")
const path = require("path")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const routes = require("./routes/index")
const errorHandler = require("./utils/middlewares/errorHandler")
const setHeaders = require("./utils/middlewares/setHeaders")

require("./db")

const server = express()

server.name = "MELI"

server.use(express.urlencoded({ extended: false }))
server.use(express.json())
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }))
server.use(express.static(path.join(__dirname, "public")))
server.use(cookieParser())
server.use(morgan("dev"))
server.use(setHeaders)

// server.use("/", routes)

//Error handlers
server.use(errorHandler)

module.exports = server