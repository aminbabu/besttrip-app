/**
 * @file /routes/js
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
const {
    validateRegister,
    validateLogin,
    validateForgotPassword,
    validateResetPassword,
    validateSendVerificationEmail,
    validateVerifyEmail,
} = require('../../../middlewares/validators');
const { isVerified, isAuthorized } = require('../../../middlewares/auth');

/**
 * @description register a new user
 * @param {string} path - /auth/customers/register
 * @param {function} middleware - ['validateRegister']
 * @param {function} controller - ['customer.register']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/register', validateRegister, customer.register);

/**
 * @description login a user
 * @param {string} path - /auth/customers/login
 * @param {function} middleware - ['validateLogin']
 * @param {function} controller - ['customer.login']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/login', validateLogin, isVerified.customer, customer.login);

/**
 * @description forgot password
 * @param {string} path - /auth/customers/forgot-password
 * @param {function} middleware - ['validateForgotPassword']
 * @param {function} controller - ['customer.forgotPassword']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/forgot-password', validateForgotPassword, customer.forgotPassword);

/**
 * @description reset password
 * @param {string} path - /auth/customers/reset-password
 * @param {function} middleware - ['validateResetPassword']
 * @param {function} controller - ['customer.resetPassword']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/reset-password', validateResetPassword, customer.resetPassword);

/**
 * @description send verification email
 * @param {string} path - /auth/customers/send-verification-email
 * @param {function} middleware - ['validateSendVerificationEmail']
 * @param {function} controller - ['customer.sendVerificationEmail']
 * @returns {object} - router
 * @access private
 * @method POST
 */
router.post(
    '/send-verification-email',
    validateSendVerificationEmail,
    isAuthorized,
    customer.sendVerificationEmail
);

/**
 * @description verify email
 * @param {string} path - /auth/customers/verify-email
 * @param {function} middleware - ['validateVerifyEmail']
 * @param {function} controller - ['customer.verifyEmail']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/verify-email', validateVerifyEmail, customer.verifyEmail);

// export
module.exports = router;
