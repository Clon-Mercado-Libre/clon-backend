const { Router } = require("express")
const { register } = require("../utils/controllers/register")
const router = Router()

router.post("/register", async (req, res, next) => {
    try {
        const { first_name, last_name, username, image, email, password, about, place, place_lat, place_lon } = req.body
        const registerUser = await register(first_name, last_name, username, image, email, password, about, place, place_lat, place_lon)
        res.status(201).send(registerUser)
    } catch (error) {
        next(error)
    }
})

module.exports = router