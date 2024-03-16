const express = require('express')
const courseController = require('../controllers/Course')
const {auth} = require('../Middleware/Auth')
const router = express.Router()

router.get('/', courseController.getCourses)
router.get('/popular', courseController.getPopularCourses)
router.get('/details/:id',auth, courseController.getCourse)

module.exports = router