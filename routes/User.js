const express = require('express')
const {addUser, fetchUser,addCourseToCart , getCart,addCourseToClasses,getClasses, deleteCourseFromCart, addGoogleUser, getStudents, getRelatedCourses,addRelatedCourse} = require('../controllers/User')
const { auth } = require("../Middleware/Auth")
const router = express.Router()

router.post('/signup', addUser)
router.post('/login', fetchUser)
router.post('/google', addGoogleUser)
router.post('/cart/:id', auth , addCourseToCart)
router.get('/cart/courses', auth, getCart)
router.post('/cart/delete/:id', auth, deleteCourseFromCart)
router.post('/classes/:id', auth, addCourseToClasses)
router.get('/classes/courses', auth, getClasses)
router.get('/courses', auth, getRelatedCourses)
router.post('/course/add', auth, addRelatedCourse)
router.get('/students', auth, getStudents)

module.exports = router