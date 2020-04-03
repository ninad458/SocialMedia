const AuthController = require('../controller/Auth')
const Validator = require('../controller/validators/Auth')
const router = require('express').Router()

router.post("/register", Validator.register, AuthController.register)
    .post("/login", Validator.login, AuthController.login)

module.exports = router