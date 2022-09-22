const server = require("./src/app.js")
const connection = require("./src/db")

connection()
server.listen(3001, () => console.log("listening at port 3001"))