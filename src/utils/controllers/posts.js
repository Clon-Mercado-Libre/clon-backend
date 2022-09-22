const User = require("../../models/users")
const Product = require("../../models/products")
const connection = require("../../db")

const postProduct = async (id, name, price, image, stock, description, place, category, type) => {
    try {
        connection()
    } catch (error) {
        throw new Error(error)
    }
    try {
        const userid = await User.findById(id)
        const newProduct = new Product({
            name, price, image, stock, description, place, category, type, user: userid._id
        })
        await newProduct.save()
        userid.products.push(newProduct._id)
        await userid.save()
        return newProduct
    } catch (error) {

    }
}
module.exports = { postProduct }