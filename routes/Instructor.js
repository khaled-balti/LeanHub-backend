const express = require('express')
const instructorController = require('../controllers/Inscructor')
const router = express.Router()

router.get("/", instructorController.getAllInstructors)
router.get("/popular", instructorController.getPopularInstructors)

module.exports = router