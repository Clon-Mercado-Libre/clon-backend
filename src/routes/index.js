const { Router } = require("express")
const register = require("./register")
const gets = require("./gets")
const posts = require("./posts")

const router = Router()

router.use("/home", gets, posts)
router.use("/", register)

module.exports = router