const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
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