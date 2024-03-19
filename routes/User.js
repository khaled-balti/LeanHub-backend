const express = require('express')
const {addUser, fetchUser,addCourseToCart , getCart, deleteCourseFromCart, addGoogleUser} = require('../controllers/User')
const { auth } = require("../Middleware/Auth")
const router = express.Router()

router.post('/signup', addUser)
router.post('/login', fetchUser)
router.post('/google', addGoogleUser)
router.post('/cart/:id', auth , addCourseToCart)
router.get('/cart/courses', auth, getCart)
router.post('/cart/delete/:id', auth, deleteCourseFromCart)
module.exports = router