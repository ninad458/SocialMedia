const router = require('express').Router()
const PostController = require('../controller/Post')
const PostValidator = require('../controller/validators/Post')
const { requiresAuthorization } = require('../middleware')
const Comment = require('./Comment')

router.route("/")
    .all(requiresAuthorization)
    .post(PostValidator.addPost, PostController.createPost)
    .get(PostController.getPosts)

router.route('/:postId')
    .all(requiresAuthorization)
    .get(PostController.getPost)
    .delete(PostController.deletePost)

Comment(router.route('/:postId/comments').all(requiresAuthorization))

module.exports = router