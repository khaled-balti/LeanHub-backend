const mongoose = require('mongoose')
const InscructorSchema = mongoose.Schema({
    age: {
        type: Number,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    diplome: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    popularity: {
        type: Boolean,
        default: false,
    },
    appriciates: {
        type: [String],
        default: [],
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    github: {
        type: String,
        default: "",
        // required: true,
    },
    linkedIn: {
        type: String,
        default: "",
        // required: true,
    },
    facebook: {
        type: String,
        default: "",
    },
    twitter: {
        type: String,
        default: "",
    },
    instagram: {
        type: String,
        default: "",
    },
    role: {
        type: String,
        default: 'instructor'
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
    classes: {
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
})
module.exports = mongoose.model('Inscructor', InscructorSchema)