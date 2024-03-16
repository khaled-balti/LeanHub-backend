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
        default: "",
        required: true,
    },
    github: {
        type: String,
        default: "",
        required: true,
    },
    linkedIn: {
        type: String,
        default: "",
        required: true,
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
})
module.exports = mongoose.model('Inscructor', InscructorSchema)