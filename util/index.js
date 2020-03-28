const jwt = require('jsonwebtoken');

const SALT = process.env.SALT || "secret"

module.exports.createError = (errorCode, message) => { throw ({ errorCode: errorCode, message: message }) }

module.exports.generateToken = async (user) => Promise.resolve(jwt.sign({
    id: user._id,
    username: user.username,
    name: user.name
}, SALT))