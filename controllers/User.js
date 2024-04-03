const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Course = require('../models/Course')
const Instructor = require('../models/Instructor')
exports.addUser = async(req,res) => {
    const {firstName, lastName, email, study, university, password, confirmPassword, image} = req.body
    console.log(firstName)
    if (password !== confirmPassword) {
        return res.status(404).json({message: "password doesn\'t match"})
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const existingUser = await User.findOne({email})
    console.log(existingUser)
    if (existingUser) {
        if (existingUser.password === "") {
            existingUser.password = hashedPassword
            existingUser.study = study
            existingUser.university = university
            await existingUser.save()
            const token = jwt.sign({email: existingUser.email, id: existingUser._id}, "user", {expiresIn: "2h"})
            return res.status(200).json({result: existingUser, token})
        }
        else {
            return res.status(404).json({message: "user already exists"})
        }
    }
    else {
        const name = `${firstName} ${lastName}`
        const result = await User.create({firstName, lastName, name,  email, study, university, password: hashedPassword, image: image})
        const token = jwt.sign({email: result.email, id: result._id}, "user", {expiresIn: "2h"})
        return res.status(200).json({result, token})
    }
} 

exports.addGoogleUser = async(req, res) => {
    const result = req.body
    const existingUser = await User.findOne({email: result.email})
    if (existingUser) {
        return res.json({message: 'User Already exists'})
    }
    else {
        await User.create({firstName: result?.givenName, lastName: result?.familyName, name: result?.name, email: result?.email, password: "", study: "", university: ""})
        return res.json({message: 'User Created successfully'})
    }
}

exports.fetchUser = async(req, res) => {
    const {email, password} = req.body
    let existingUser = await User.findOne({email})
    if (!existingUser) {
        existingUser = await Instructor.findOne({email})
        if (!existingUser) {
            return res.status(404).json({message: "user doesn\'t exist"})
        }
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
    const courseExists = req.user.cart.courses.includes(id);
    if (courseExists) {
        return res.json({ message: "Course already added" });
    }
    req.user.cart.courses.push(id)
    req.user.cart.courseNumber += 1
    await req.user.save()
    const addedCourse = await Course.findById(id)
    return res.status(200).json(addedCourse)
}

exports.addCourseToClasses = async(req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: "Course identifier invalid"})
    }
    req.user.classes.courses.push(id)
    req.user.classes.courseNumber += 1
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

exports.getClasses = async (req,res) => {
    try {
        const coursesObjects =  await req.user.populate("classes.courses")
        const courses = coursesObjects.classes.courses
        await Course.populate(courses, { path: 'creator', select: 'firstName' });
        const nombreCourses = coursesObjects.classes.courseNumber
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

exports.getRelatedCourses = async (req, res) => {
    try {
        const courses = await Course.find({creator: req.user._id})
        res.status(200).json({courses})
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}
exports.addRelatedCourse = async (req, res) => {
    const course = req.body
    const newCourse = new Course({...course, creator: req.user._id, createdAt: new Date().toISOString()})
    try {
        await newCourse.save()
        res.status(200).json(newCourse)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

exports.getStudents = async (req, res) => {
    try {
        const users = await User.find();
        const populatedUsers = await Promise.all(users.map(async (user) => {
            await user.populate("classes.courses")
            return user;
        }));
        const students = populatedUsers.filter((user) => {
            return user.classes.courses.some((course) => {
                return course.creator.equals(req.user._id);
            });
        });
        res.status(200).json(students);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
