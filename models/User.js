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
    },
    university: {
        type: String,
    },
    password: {
        type: String,
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
    },
    role: {
        type: String,
        default: 'student'
    }
})
module.exports = mongoose.model('User', UserSchema)