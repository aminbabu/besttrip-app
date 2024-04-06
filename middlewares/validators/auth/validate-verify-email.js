/**
 * @file /middlewares/validators/validateVerifyEmail.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 22 March, 2024
 */

// dependencies
const { query } = require('express-validator');
const { expressValidator } = require('../../../handlers/errors');

// validate verify email
module.exports = [query('token').isJWT().withMessage('Token is not valid'), expressValidator];
