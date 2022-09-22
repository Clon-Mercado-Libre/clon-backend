const User = require("../../models/users");
const Product = require("../../models/product");

const patchUser = async (id, first_name, last_name, username, image, email, password, about, place, place_lat, place_lon) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { first_name, last_name, username, image, email, password, about, place, place_lat, place_lon }, { new: true })
        await updatedUser.save()
        const findUpdatedUser = await User.findById(id)
        return findUpdatedUser
    } catch (error) {
        throw new Error(error)
    }
}

const patchProduct = async (id, name, price, image, stock, description, place, category, type) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, image, stock, description, place, category, type })
        await updatedProduct.save()
        const findUpdatedProduct = await Product.findById(id)
        return findUpdatedProduct
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    patchUser,
    patchProduct
}