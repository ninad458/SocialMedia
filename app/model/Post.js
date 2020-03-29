const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    post: {
        type: String,
        require: true
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
    date: {
        type: Date,
        default: Date.now
    },
    noOfComments: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Posts', PostSchema)