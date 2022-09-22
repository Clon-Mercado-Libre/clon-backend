require("dotenv").config()

const mongoose = require("mongoose")

module.exports = () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("volvio el famoso conectado a mongodb uwu")).catch((e) => console.log("Error de conexion", e))
}