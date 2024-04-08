/**
 * @file /middlewares/validators/validateSendVerificationEmail.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 08 April, 2024
 */

// dependencies
const { body } = require('express-validator');
const { expressValidator } = require('../../../handlers/errors');

// validate resend verification email
module.exports = [
    body('email').normalizeEmail().isEmail().withMessage('Email is not valid'),
    expressValidator,
];
