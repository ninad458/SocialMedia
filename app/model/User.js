const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 5;

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

UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, SALT_ROUNDS);
    next()
})

UserSchema.methods.comparePasswords = function (attempt) {
    return bcrypt.compareSync(attempt, this.password);
}

module.exports = mongoose.model("Users", UserSchema)