const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Course = require('../models/Course')
exports.addUser = async(req,res) => {
    const {firstName, lastName, email, study, university, password, confirmPassword} = req.body
    const existingUser = await User.findOne({email})
    if (existingUser) {
        return res.status(404).json({message: "user already exists"})
    }
    if (password !== confirmPassword) {
        return res.status(404).json({message: "password doesn\'t match"})
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const name = `${firstName} ${lastName}`
    const result = await User.create({firstName, lastName, name,  email, study, university, password: hashedPassword})
    const token = jwt.sign({email: result.email, id: result._id}, "user", {expiresIn: "2h"})
    return res.status(200).json({result, token})
} 

exports.fetchUser = async(req, res) => {
    const {email, password} = req.body
    const existingUser = await User.findOne({email})
    if (!existingUser) {
        return res.status(404).json({message: "user doesn\'t exist"})
    }
    const passwordIsCorrect = await bcrypt.compare(password, existingUser.password)
    if (!passwordIsCorrect) {
        return res.status(404).json({message: "password doesn\'t match"})
    }
    const token = jwt.sign({email: existingUser.email, id: existingUser._id}, "user", {expiresIn: "2h"}) 
    return res.status(200).json({result: existingUser, token})
}

exports.addCourseToCart = async(req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: "Course identifier invalid"})
    }
    const course = await req.user.cart.courses.find(course => course.id == id)
    if (course) {
        return res.json({message: "Course Already added"})
    }
    req.user.cart.courses.push(id)
    req.user.cart.courseNumber += 1
    await req.user.save()
    const addedCourse = await Course.findById(id)
    return res.status(200).json(addedCourse)
}

exports.getCart = async (req,res) => {
    try {
        const coursesObjects =  await req.user.populate("cart.courses")
        const courses = coursesObjects.cart.courses
        await Course.populate(courses, { path: 'creator', select: 'firstName' });
        const nombreCourses = coursesObjects.cart.courseNumber
        res.status(200).json({courses, nombreCourses})
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

exports.deleteCourseFromCart = async (req,res) => {
    try {
        const {id} = req.params
        req.user.cart.courses = await req.user.cart.courses.filter(course => !course.equals(id))
        req.user.cart.courseNumber -= 1
        await req.user.save()
        const removedItem = await Course.findById(id)
        res.status(200).json(removedItem)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}
