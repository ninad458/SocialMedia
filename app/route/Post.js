const router = require('express').Router()
const PostController = require('../controller/Post')
const { requiresAuthorization } = require('../middleware')

router.route("/")
    .all(requiresAuthorization)
    .post(PostController.createPost)
    .get(PostController.getPosts)

module.exports = router