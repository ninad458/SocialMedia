const User = require('../model/User')

module.exports.register = async (req, res) => {
    const body = req.body
    const name = body.name
    const username = body.username
    const password = body.password

    const savedUser = await new User({
        name: name,
        username: username,
        password: password
    }).save()

    res.status(200).json({ id: savedUser._id })
}