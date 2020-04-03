const mongoose = require('mongoose')
const Post = require('./Post')

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

CommentSchema.post('save', async function (next) {
    await Post.findOneAndUpdate({ _id: this.postId }, { $inc: { noOfComments: 1 } })
})

module.exports = mongoose.model('Comments', CommentSchema)