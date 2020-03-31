const Post = require('../model/Post')
const Comment = require('../model/Comment')
const { createError } = require('../../util')

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

module.exports.getCommentsOnAPost = async (req, res) => {
    try {
        const postId = req.params.postId
        const postExistsPromise = Post.exists({ _id: postId })
        const page = parseInt(req.body.page || 1) - 1
        const items = parseInt(req.query.count || 30)

        const commentsPromise = Comment
            .find({ "postId": postId })
            .select("-__v -postId")
            .skip(page * items)
            .limit(items).sort({ "createdAt": -1 })
            .then(comments => [null, comments]).catch(err => [err, null])

        const postExists = await postExistsPromise

        if (postExists == false) createError(404, "Post not found")

        const [err, comments] = await commentsPromise

        if (err) createError(422, "Something went wrong " + err.message)
        if (!comments) createError(400, "Something went wrong")

        res.status(200).json({ comments: comments })
    } catch (error) {
        res.status(error.errorCode || 400).json({ message: error.message })
    }
}