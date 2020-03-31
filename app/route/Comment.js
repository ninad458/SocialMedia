const CommentController = require('../controller/Comment')

module.exports = (router) => router
    .get(CommentController.getCommentsOnAPost)
    .post(CommentController.writeComment)