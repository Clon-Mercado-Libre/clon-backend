const { Router } = require("express")
const { postProduct } = require("../utils/controllers/posts")

const router = Router()

router.post("/product/:id", async (req, res, next) => {
    try {
        const { name, price, image, stock, description, place, category, type } = req.body
        const newProduct = await postProduct(req.params.id, name, price, image, stock, description, place, category, type)
        res.status(201).send(newProduct)
    } catch (error) {
        next(error)
    }
})

module.exports = router