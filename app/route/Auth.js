const AuthController = require('../controller/Auth')
const router = require('express').Router()

router.post("/register", AuthController.register)

module.exports = router