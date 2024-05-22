/**
 * @file /routes/auth/customers/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 March, 2024
 * @update_date 19 April, 2024
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
} = require('../../../controllers/api/auth/customers');

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
 * @param {string} path - /auth/customers/register
 * @param {function} validator - ['validateRegister']
 * @param {function} controller - ['register']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/register', validateRegister, register);

/**
 * @description login a user
 * @param {string} path - /auth/customers/login
 * @param {function} validator - ['validateLogin']
 * @param {function} middleware - ['isVerified.customer']
 * @param {function} controller - ['login']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/login', validateLogin, isVerified.customer, login);

/**
 * @description forgot password
 * @param {string} path - /auth/customers/forgot-password
 * @param {function} validator - ['validateForgotPassword']
 * @param {function} controller - ['forgotPassword']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/forgot-password', validateForgotPassword, forgotPassword);

/**
 * @description reset password
 * @param {string} path - /auth/customers/reset-password
 * @param {function} validator - ['validateResetPassword']
 * @param {function} controller - ['resetPassword']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/reset-password', validateResetPassword, resetPassword);

/**
 * @description send verification email
 * @param {string} path - /auth/customers/send-verification-email
 * @param {function} validator - ['validateSendVerificationEmail']
 * @param {function} controller - ['sendVerificationEmail']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/send-verification-email', validateSendVerificationEmail, sendVerificationEmail);

/**
 * @description verify email
 * @param {string} path - /auth/customers/verify-email
 * @param {function} validator - ['validateVerifyEmail']
 * @param {function} controller - ['verifyEmail']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/verify-email', validateVerifyEmail, verifyEmail);

// export
module.exports = router;
