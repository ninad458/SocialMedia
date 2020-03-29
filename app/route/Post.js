const router = require('express').Router()
const PostController = require('../controller/Post')
const { requiresAuthorization } = require('../middleware')

router.post("/", requiresAuthorization, PostController.createPost)

module.exports = router