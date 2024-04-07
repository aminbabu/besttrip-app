/**
 * @file /routes/js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 29 March, 2024
 */

// dependencies
const express = require('express');

const router = express.Router();

// controllers
const { user } = require('../../../controllers/auth');

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
 * @param {string} path - /auth/users/register
 * @param {function} middleware - ['validateRegister']
 * @param {function} controller - ['user.register']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/register', validateRegister, user.register);

/**
 * @description login a user
 * @param {string} path - /auth/users/login
 * @param {function} middleware - ['validateLogin']
 * @param {function} controller - ['user.login']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/login', validateLogin, isVerified.user, user.login);

/**
 * @description forgot password
 * @param {string} path - /auth/users/forgot-password
 * @param {function} middleware - ['validateForgotPassword']
 * @param {function} controller - ['user.forgotPassword']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/forgot-password', validateForgotPassword, user.forgotPassword);

/**
 * @description reset password
 * @param {string} path - /auth/users/reset-password
 * @param {function} middleware - ['validateResetPassword']
 * @param {function} controller - ['user.resetPassword']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/reset-password', validateResetPassword, user.resetPassword);

/**
 * @description send verification email
 * @param {string} path - /auth/users/send-verification-email
 * @param {function} middleware - ['validateSendVerificationEmail', 'isAuthorized']
 * @param {function} controller - ['user.sendVerificationEmail']
 * @returns {object} - router
 * @access private
 * @method POST
 */
router.post(
    '/send-verification-email',
    validateSendVerificationEmail,
    isAuthorized,
    user.sendVerificationEmail
);

/**
 * @description verify email
 * @param {string} path - /auth/users/verify-email
 * @param {function} middleware - ['validateVerifyEmail']
 * @param {function} controller - ['user.verifyEmail']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/verify-email', validateVerifyEmail, user.verifyEmail);

// export
module.exports = router;
