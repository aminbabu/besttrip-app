/**
 * @file /middlewares/validators/validateForgotPassword.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 10 April, 2024
 */

// dependencies
const { body } = require('express-validator');
const { expressValidator } = require('../../../handlers/errors');

// validate forgot password
module.exports = [body('email').isEmail().withMessage('Email is not valid'), expressValidator];
