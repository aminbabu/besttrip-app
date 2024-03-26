/**
 * @file /middlewares/validators/validateSendVerificationEmail.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March 2024
 * @update_date 22 March 2024
 */

// dependencies
const { body, header } = require('express-validator');
const { expressValidator } = require('../../../handlers/errors');

// validate resend verification email
module.exports = [
    body('email').normalizeEmail().isEmail().withMessage('Email is not valid'),
    header('Authorization')
        .exists()
        .withMessage('Authorization header is missing')
        .bail()
        .isString()
        .withMessage('Authorization header is not a string'),
    expressValidator,
];
