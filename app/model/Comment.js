const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    comment: {
        type: String,
        require: true
    },
    postId: {
        type: mongoose.Types.ObjectId,
        ref: 'Posts',
        index: true
    },
    by: {
        name: {
            type: String,
            require: true
        },
        username: {
            type: String,
            require: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Comments', CommentSchema)