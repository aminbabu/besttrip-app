/**
 * @file /routes/api/auth/users/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 08 April, 2024
 * @update_date 09 June, 2024
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
    resendVerificationEmail,
    verifyEmail,
    accountActivation,
} = require('../../../../controllers/api/auth/users');

// middlewares
const {
    validateRegister,
    validateLogin,
    validateForgotPassword,
    validateResetPassword,
    validateSendVerificationEmail,
    validateVerifyEmail,
} = require('../../../../middlewares/api/validators/auth');

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
 * @param {function} validator - ['validateLogin']
 * @param {function} controller - ['login']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/login', validateLogin, login);

/**
 * @description forgot password
 * @param {string} path - /auth/users/forgot-password
 * @param {function} validator - ['validateForgotPassword']
 * @param {function} controller - ['forgotPassword']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/forgot-password', validateForgotPassword, forgotPassword);

/**
 * @description reset password
 * @param {string} path - /auth/users/reset-password
 * @param {function} validator - ['validateResetPassword']
 * @param {function} controller - ['resetPassword']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/reset-password', validateResetPassword, resetPassword);

/**
 * @description send verification email
 * @param {string} path - /auth/users/send-verification-email
 * @param {function} validator - ['validateSendVerificationEmail']
 * @param {function} controller - ['resendVerificationEmail']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post('/send-verification-email', validateSendVerificationEmail, resendVerificationEmail);

/**
 * @description verify email
 * @param {string} path - /auth/users/verify-email
 * @param {function} validator - ['validateVerifyEmail']
 * @param {function} controller - ['verifyEmail']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/verify-email', validateVerifyEmail, verifyEmail);

/**
 * @description account activation
 * @param {string} path - /auth/users/account-activation
 * @param {function} controller - ['accountActivation']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/account-activation', validateLogin, accountActivation);

// export
module.exports = router;
