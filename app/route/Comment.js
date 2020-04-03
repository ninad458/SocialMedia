const CommentController = require('../controller/Comment')
const CommentValidator = require('../controller/validators/Comment')

module.exports = (router) => router
    .get(CommentController.getCommentsOnAPost)
    .post(CommentValidator.addComment, CommentController.writeComment)