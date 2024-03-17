const Course = require("../models/Course")
exports.getCourses = async (req,res) => {
    try {
        const courses = await Course.find().populate("creator", "firstName")
        res.status(200).json(courses)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

exports.getPopularCourses = async (req, res) => {
    try {
        const courses = await Course.find({popularity: true}).populate("creator", "firstName")
        res.status(200).json(courses)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

exports.getCourse = async (req,res) => {
    const id = req.params.id
    try {
        const course = await Course.findById(id).populate("creator")
        res.status(200).json(course)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}
