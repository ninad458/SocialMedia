const { check, validationResult, body } = require('express-validator');

module.exports.register = [
    body('username')
        .not().isEmpty(),
    body('name')
        .not().isEmpty(),
    body('password')
        .not().isEmpty()
        .withMessage('Please provide a password')
        .isLength({ min: 5 })
        .withMessage('Length of the password should be more than 5'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next()
    }
]

module.exports.login = [
    body('username')
        .not().isEmpty(),
    body('password')
        .not().isEmpty()
        .withMessage('Please provide a password')
        .isLength({ min: 5 })
        .withMessage('Length of the password should be more than 5'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next()
    }
]