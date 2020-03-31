const Post = require('../model/Post')
const Comment = require('../model/Comment')
const { createError } = require('../../util')

module.exports.getPosts = async (req, res) => {
    res.send("Hello " + req.params.postId)
}

module.exports.writeComment = async (req, res) => {
    try {
        const postId = req.params.postId
        const comment = req.body.comment

        const [err, savedPost] = await Post.findOne({ _id: postId }).then(post => [null, post]).catch(err => [err, null])
        if (err) createError(422, "Something went wrong " + err.message)
        if (!savedPost) createError(404, "Post doesn't exist")

        const [commentError, savedComment] = await new Comment({
            comment: comment,
            by: savedPost.by,
            postId: savedPost._id
        }).save().then(comment => [null, comment]).catch(err => [err, null])

        if (commentError) createError(422, "Error adding comment " + commentError.message)
        if (!savedComment) createError(400, "Something went wrong")

        res.status(201).json({ message: "Comment saved" })
    } catch (error) {
        res.status(error.errorCode || 400).json({ message: error.message })
    }
}