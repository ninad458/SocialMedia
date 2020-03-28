const User = require('../model/User')
const { createError, generateToken } = require('../../util')

const userExists = async (username) => User.findOne({ username })

module.exports.register = async (req, res) => {
    const body = req.body
    const name = body.name
    const username = body.username
    const password = body.password

    try {
        const exists = await userExists(username)
        if (exists) createError(409, "User already exists")
        const [err, savedUser] = await new User({
            name: name,
            username: username,
            password: password
        }).save().then(user => [null, user]).catch(err => [null, err])
        if (err) createError(422, "Could not insert into database " + err.message)
        if (!savedUser) createError(400, "Something went wrong")

        const token = await generateToken(savedUser)

        res.status(201).json({ token: token })
    } catch (error) {
        res.status(error.errorCode || 400).json({ error: error.message })
    }
}

module.exports.login = async (req, res) => {
    const body = req.body
    const username = body.username
    const password = body.password

    try {
        const user = await userExists(username)
        if (!user) createError(404, "User by that username not found")

        const correct = user.comparePasswords(password)

        if (correct == false) createError(401, "Password is incorrect for the given username")

        const token = await generateToken(user)
        res.status(200).json({ token: token })
    } catch (error) {
        res.status(error.errorCode || 400).json({ message: error.message })
    }
}