const jwt = require('jsonwebtoken')
const User = require('../models/User')
exports.auth = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const isCustomAuth = token.length < 500
        let decodedData;
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'user')
            req.userId = decodedData?.id
            const user = await User.findById(req.userId)
            req.user = user
        }
        else {
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub
        }
        next()
    } catch (error) {
        console.log(error)
    }
}