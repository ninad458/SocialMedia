const Post = require('../model/Post')
const User = require('../model/User')

const { createError } = require('../../util')

const userExists = async (username) => User.findOne({ username })

module.exports.createPost = async (req, res) => {
    try {
        const user = res.user
        const post = req.body.post

        const userExistsPromise = userExists(user.username).then(user => [null, user]).catch(err => [err, null])
        const newPostPromise = new Post({
            post: post,
            by: {
                name: user.name,
                username: user.username
            }
        }).save().then(post => [null, post]).catch(err => [err, null])

        const [[userErr, userInDataBase], [postErr, savedPost]] = await Promise.all([userExistsPromise, newPostPromise])
        if (userErr || !userInDataBase) createError(500, "User doesn't exist by that credentials")
        if (postErr) createError(422, "Post couldn't be saved " + postErr.message)
        if (!savedPost) createError(400, "Post couldn't be saved")

        res.status(201).json({ postId: savedPost._id })

    } catch (error) {
        res.status(error.errorCode || 400).json({ message: error.message })
    }
}