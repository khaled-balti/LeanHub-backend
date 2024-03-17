const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    study: {
        type: String,
        required: true
    },
    university: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        courseNumber: {
            type: Number,
            default: 0,
        },
        courses: {
            type: [mongoose.Types.ObjectId],
            ref: 'Course',
            default: []
        }
    }
})
module.exports = mongoose.model('User', UserSchema)