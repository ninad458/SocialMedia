const { check, validationResult, body } = require('express-validator');

module.exports.addComment = [
    body('comment')
        .not().isEmpty(),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next()
    }
]