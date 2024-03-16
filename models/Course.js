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
    }
})
module.exports = mongoose.model('Course', courseSchema)