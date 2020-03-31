const CommentController = require('../controller/Comment')

module.exports = (router) => router.get(CommentController.getPosts)