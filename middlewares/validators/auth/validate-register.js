/**
 * @file /middlewares/validators/validateRegister.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 22 March, 2024
 */

// dependencies
const { body } = require('express-validator');
const { expressValidator } = require('../../../handlers/errors');

// validate register
module.exports = [
    body('name').trim().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').normalizeEmail().isEmail().withMessage('Email is not valid'),
    body('phone').isMobilePhone().withMessage('Phone number is not valid'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 6 characters long'),
    expressValidator,
];
