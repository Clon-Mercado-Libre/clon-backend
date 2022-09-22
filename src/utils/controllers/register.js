const User = require("../../models/users");

const register = async (first_name, last_name, username, image, email, password, about, place, place_lat, place_lon) => {
    try {
        const register = new User({
            first_name, last_name, username, image, email, password, about, place, place_lat, place_lon
        })
        await register.save()
        return register
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = { register }