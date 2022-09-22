const User = require("../../models/users")
const Product = require("../../models/products")
const connection = require("../../db")
require("dotenv").config()

const getUsers = async (name) => {
    try {
        connection()
    } catch (error) {
        throw new Error(error)
    }
    try {
        const arrayUsers = await User.find({ deleted: false }).populate({ path: "products", match: { deleted: false } })
        if (name) {
            let userFound = arrayUsers.filter(
                u =>
                    u.first_name?.toLowerCase().includes(name.toLowerCase()) ||
                    u.last_name?.toLowerCase().includes(name.toLowerCase()) ||
                    u.username?.toLowerCase().includes(name.toLowerCase()) ||
                    u.place?.toLowerCase().includes(name.toLowerCase()) ||
                    u.email?.toLowerCase().includes(name.toLowerCase())
            )
            if (userFound.length > 0) return userFound
            if (userFound.length === 0) {
                throw new Error("No se encontraron coinidencias con la busqueda")
            }
        } else {
            return arrayUsers
        }
    } catch (error) {
        throw new Error(error)
    }
}
const userId = async (id) => {
    try {
        connection();
    } catch (err) {
        console.error(err);
    }
    try {
        const arrayUsers = await User.findOne({ _id: id, deleted: false })
            .populate({ path: "products", match: { deleted: false }, })
        return arrayUsers;
    } catch (error) {
        throw new Error(error);
    }
};

const getProducts = async (name) => {
    try {
        connection()
    } catch (error) {
        throw new Error(error)
    }
    try {
        const arrayProduct = await Product.find({ deleted: false }).populate({ path: "user", deleted: false })
        if (name) {
            const productFound = arrayProduct.filter(
                p =>
                    p.name?.toLowerCase().includes(name.toLowerCase()) ||
                    p.place?.toLowerCase().includes(name.toLowerCase()) ||
                    p.category?.toLowerCase().includes(name.toLowerCase()) ||
                    p.type?.toLowerCase().includes(name.toLowerCase())
            )
            if (productFound > 0) return productFound
            if (productFound < 0) {
                throw new Error("No se encontraron coincidencias")
            }
        } else {
            return arrayProduct
        }
    } catch (error) {
        throw new Error(error)
    }
}

const productId = async (id) => {
    try {
        connection()
    } catch (error) {
        throw new Error(error)
    }
    try {
        const arrayUsers = await Product.findOne({ _id: id, deleted: false }).populate({ path: "user", match: { deleted: false }, })
        return arrayUsers;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    userId,
    productId,
    getProducts,
    getUsers
}