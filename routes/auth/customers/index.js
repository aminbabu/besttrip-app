/**
 * @file /routes/auth.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 March, 2024
 * @update_date 29 March, 2024
 */

// dependencies
const express = require('express');

const router = express.Router();

// controllers
const { customer } = require('../../../controllers/auth');

// middlewares
const { auth } = require('../../../middlewares/validators');
const { isVerified, isAuthorized } = require('../../../middlewares/auth');

/**
 * @description register a new user
 * @param {string} path - /auth/customers/register
 * @param {function} middleware - ['auth.validateRegister']
 * @param {function} controller - ['customer.register']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/register', auth.validateRegister, customer.register);

/**
 * @description login a user
 * @param {string} path - /auth/customers/login
 * @param {function} middleware - ['auth.validateLogin']
 * @param {function} controller - ['customer.login']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/login', auth.validateLogin, isVerified.customer, customer.login);

/**
 * @description forgot password
 * @param {string} path - /auth/customers/forgot-password
 * @param {function} middleware - ['auth.validateForgotPassword']
 * @param {function} controller - ['customer.forgotPassword']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/forgot-password', auth.validateForgotPassword, customer.forgotPassword);

/**
 * @description reset password
 * @param {string} path - /auth/customers/reset-password
 * @param {function} middleware - ['auth.validateResetPassword']
 * @param {function} controller - ['customer.resetPassword']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/reset-password', auth.validateResetPassword, customer.resetPassword);

/**
 * @description send verification email
 * @param {string} path - /auth/customers/send-verification-email
 * @param {function} middleware - ['auth.validateSendVerificationEmail']
 * @param {function} controller - ['customer.sendVerificationEmail']
 * @returns {object} - router
 * @access private
 * @method POST
 */
router.post(
    '/send-verification-email',
    auth.validateSendVerificationEmail,
    isAuthorized,
    customer.sendVerificationEmail
);

/**
 * @description verify email
 * @param {string} path - /auth/customers/verify-email
 * @param {function} middleware - ['auth.validateVerifyEmail']
 * @param {function} controller - ['customer.verifyEmail']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/verify-email', auth.validateVerifyEmail, customer.verifyEmail);

// export
module.exports = router;
