const express = require('express')
const {addUser, fetchUser} = require('../controllers/User')
const router = express.Router()

router.post('/signup', addUser)
router.post('/login', fetchUser)
module.exports = router