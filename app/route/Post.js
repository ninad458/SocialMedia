const router = require('express').Router()
const PostController = require('../controller/Post')
const { requiresAuthorization } = require('../middleware')
const Comment = require('./Comment')

router.route("/")
    .all(requiresAuthorization)
    .post(PostController.createPost)
    .get(PostController.getPosts)

router.route('/:postId')
    .all(requiresAuthorization)
    .get(PostController.getPost)

Comment(router.route('/:postId/comments').all(requiresAuthorization))

module.exports = router