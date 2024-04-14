/**
 * @file /routes/auth/users/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 08 April, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    register,
    login,
    forgotPassword,
    resetPassword,
    sendVerificationEmail,
    verifyEmail,
} = require('../../../controllers/auth/users');

// middlewares
const {
    validateRegister,
    validateLogin,
    validateForgotPassword,
    validateResetPassword,
    validateSendVerificationEmail,
    validateVerifyEmail,
} = require('../../../middlewares/validators/auth');
const { isVerified } = require('../../../middlewares/auth');

/**
 * @description register a new user
 * @param {string} path - /auth/users/register
 * @param {function} middleware - ['validateRegister']
 * @param {function} controller - ['register']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/register', validateRegister, register);

/**
 * @description login a user
 * @param {string} path - /auth/users/login
 * @param {function} middleware - ['validateLogin']
 * @param {function} controller - ['login']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/login', validateLogin, isVerified.user, login);

/**
 * @description forgot password
 * @param {string} path - /auth/users/forgot-password
 * @param {function} middleware - ['validateForgotPassword']
 * @param {function} controller - ['forgotPassword']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/forgot-password', validateForgotPassword, forgotPassword);

/**
 * @description reset password
 * @param {string} path - /auth/users/reset-password
 * @param {function} middleware - ['validateResetPassword']
 * @param {function} controller - ['resetPassword']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/reset-password', validateResetPassword, resetPassword);

/**
 * @description send verification email
 * @param {string} path - /auth/users/send-verification-email
 * @param {function} middleware - ['validateSendVerificationEmail']
 * @param {function} controller - ['sendVerificationEmail']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/send-verification-email', validateSendVerificationEmail, sendVerificationEmail);

/**
 * @description verify email
 * @param {string} path - /auth/users/verify-email
 * @param {function} middleware - ['validateVerifyEmail']
 * @param {function} controller - ['verifyEmail']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/verify-email', validateVerifyEmail, verifyEmail);

// export
module.exports = router;
