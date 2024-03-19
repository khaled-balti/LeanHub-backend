const jwt = require('jsonwebtoken')
const User = require('../models/User')
exports.auth = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const isCustomAuth = token.length < 500
        let decodedData;
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'user')
            const id = decodedData?.id
            const user = await User.findById(id)
            req.user = user
        }
        else {
            decodedData = jwt.decode(token)
            const email = decodedData?.email
            const user = await User.findOne({ email: email})
            req.user = user
        }
        next()
    } catch (error) {
        console.log(error)
    }
}