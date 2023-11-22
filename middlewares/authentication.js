const { verifyingToken } = require("../helpers/jwt")
const { User } = require('../models')


const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if (!access_token) return res.status(401).json({ message: 'Invalid Token' })

        const decodedToken = verifyingToken(access_token)

        const user = await User.findByPk(decodedToken.id)
        if (!user) return res.status(401).json({ message: 'Invalid Token' })

        req.user = user

        next()
    } catch (err) {
        if (err.name === 'JsonWebTokenError'){
            res.status(401).json({message: 'Invalid Token'})
        } else {
            res.status(500).json({message: 'Internal server error'})
        }
    }
}


module.exports = {authentication}