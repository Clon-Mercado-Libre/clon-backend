const jwt = require("jsonwebtoken");
require("dotenv").config();

// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
    const token = req.headers["token"];
    if (!token) throw new Error("No tenes acceso negrito");
    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "No me hardcodees el token pa" });
    }
};

module.exports = verifyToken;