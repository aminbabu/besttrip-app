/**
 * @file /routes/auth.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March 2024
 * @update_date 29 March 2024
 */

// dependencies
const express = require('express');

const router = express.Router();

// controllers
const { user } = require('../../../controllers/auth');

// middlewares
const { auth } = require('../../../middlewares/validators');
const { isVerified, isAuthorized } = require('../../../middlewares/auth');

/**
 * @description register a new user
 * @param {string} path - /auth/users/register
 * @param {function} middleware - ['auth.validateRegister']
 * @param {function} controller - ['user.register']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/register', auth.validateRegister, user.register);

/**
 * @description login a user
 * @param {string} path - /auth/users/login
 * @param {function} middleware - ['auth.validateLogin']
 * @param {function} controller - ['user.login']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/login', auth.validateLogin, isVerified, user.login);

/**
 * @description forgot password
 * @param {string} path - /auth/users/forgot-password
 * @param {function} middleware - ['auth.validateForgotPassword']
 * @param {function} controller - ['user.forgotPassword']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/forgot-password', auth.validateForgotPassword, user.forgotPassword);

/**
 * @description reset password
 * @param {string} path - /auth/users/reset-password
 * @param {function} middleware - ['auth.validateResetPassword']
 * @param {function} controller - ['user.resetPassword']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/reset-password', auth.validateResetPassword, user.resetPassword);

/**
 * @description send verification email
 * @param {string} path - /auth/users/send-verification-email
 * @param {function} middleware - ['auth.validateSendVerificationEmail', 'isAuthorized']
 * @param {function} controller - ['user.sendVerificationEmail']
 * @returns {object} - router
 * @access private
 * @method POST
 */
router.post(
    '/send-verification-email',
    auth.validateSendVerificationEmail,
    isAuthorized,
    user.sendVerificationEmail
);

/**
 * @description verify email
 * @param {string} path - /auth/users/verify-email
 * @param {function} middleware - ['auth.validateVerifyEmail']
 * @param {function} controller - ['user.verifyEmail']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/verify-email', auth.validateVerifyEmail, user.verifyEmail);

// export
module.exports = router;
