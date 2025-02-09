const jwt = require('jsonwebtoken')

const createToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_SECRET, {expiresIn: process.env.ACCESS_TIME})
}


const refreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_SECRET, {expiresIn: process.env.REFRESH_TIME})
}

module.exports = {
    createToken,
    refreshToken
}