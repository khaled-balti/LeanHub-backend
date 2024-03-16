const Inscructor = require('../models/Instructor')

exports.getAllInstructors = async (req, res) => {
    try {
        const intructors = await Inscructor.find()
        res.status(200).json(intructors)
    } catch (error) {
        console.log(error)
        res.status(404).json({message: error.message})
    }
}

exports.getPopularInstructors = async (req, res) => {
    try {
        const intructors = await Inscructor.find({popularity: true})
        res.status(200).json(intructors)
    } catch (error) {
        console.log(error)
        res.status(404).json({message: error.message})
    }
}