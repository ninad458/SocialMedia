const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
})

UserSchema.methods.comparePasswords = function (attempt) {
    return this.password == attempt
}

module.exports = mongoose.model("Users", UserSchema)