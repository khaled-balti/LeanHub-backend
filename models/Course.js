const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
        default: 0
    },
    theme: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    popularity: {
        type: Boolean,
        default: false
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inscructor',
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    discount: {
        type: Number,
        default: 0,
    },
    duration: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ''
    },
    videos: {
        type: [
            {
                videoTitle: {
                    type: String,
                    required: true
                },
                duration: {
                    type: Number,
                    required: true
                },
                image: {
                    type: String,
                    required: true
                },
                file: {
                    type: String,
                    required: true
                }
            }
        ],
        default: []
    }
})
module.exports = mongoose.model('Course', courseSchema)