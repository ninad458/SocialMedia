const router = require('express').Router()
const PostController = require('../controller/Post')
const { requiresAuthorization } = require('../middleware')
const Comment = require('./Comment')

router.route("/")
    .all(requiresAuthorization)
    .post(PostController.createPost)
    .get(PostController.getPosts)


Comment(router.route('/:postId/comments').all(requiresAuthorization))

module.exports = router