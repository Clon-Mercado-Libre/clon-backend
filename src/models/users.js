const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Product = require("./products")
const SALT_WORK_FACTOR = 10
const Schema = mongoose.Schema

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    username: { type: String, unique: true, required: true },
    image: { type: String, default: "https://assets.stickpng.com/images/585e4beacb11b227491c3399.png" },
    email: { type: String, lowercase: true, required: [true, "Email is required"], unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "email invalid"] },
    password: String,
    about: String(1000),
    place: String,
    place_lat: String,
    place_lon: String,
    deleted: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    level: { type: Number, default: 1 },
    products: [{ type: mongoose.Schema.ObjectId, ref: "Product" }]
})

userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return next()
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err)
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
})

userSchema.methods.comparePassword = function (candidatePassword) {
    const currentPassword = this.password;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, currentPassword, function (err, isMatch) {
            if (err) return reject(err)
            resolve(isMatch)
        })
    })
}

const User = mongoose.model("User", userSchema)

module.exports = User