const { verifyToken, createError } = require('../../util')


module.exports.requiresAuthorization = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token']
        if (!token) createError(403, "Please provide the token")
        const user = verifyToken(token)
        res.user = user
        next()
    } catch (error) {
        res.status(error.errorCode || 400).json({ message: error.message })
    }
}