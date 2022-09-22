const { Router } = require("express")
const {
    getUsers,
    getProducts,
    userId,
    productId
} = require("../utils/controllers/gets")

const router = Router()

router.get("/users", async (req, res, next) => {
    try {
        const users = await getUsers(req.query.name)
        res.status(200).send(users)
    } catch (error) {
        next(error)
    }
})

router.get("/product", async (req, res, next) => {
    try {
        const products = await getProducts(req.query.name)
        res.status(200).send(products.sort((a, b) => b.createdAt - a.createdAt))
    } catch (error) {
        next(error)
    }
})

router.get("/user/:id", async (req, res, next) => {
    try {
        const user = await userId(req.params.id)
        res.status(200).send(user)
    } catch (error) {
        next(error)
    }
})

router.get("/product/:id", async (req, res, next) => {
    try {
        const product = await productId(req.params.id)
        res.status(200).send(product)
    } catch (err) {
        next(err)
    }
})

module.exports = router