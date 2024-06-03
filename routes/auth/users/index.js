/**
 * @file /routes/auth/users/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 08 April, 2024
 * @update_date 03 June, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    viewRegister,
    register,
    viewLogin,
    login,
    viewForgotPassword,
    forgotPassword,
    viewResetPassword,
    resetPassword,
    viewResendVerificationEmail,
    resendVerificationEmail,
    viewVerifyEmail,
    verifyEmail,
} = require('../../../controllers/auth/users');
const { isAuthorized, isUserNotAuthorized } = require('../../../middlewares/auth');

// middlewares
const {
    validateRegister,
    validateLogin,
    validateForgotPassword,
    validateResetPassword,
    validateSendVerificationEmail,
    validateVerifyEmail,
} = require('../../../middlewares/validators/auth');

/**
 * @description view register page
 * @param {string} path - /auth/users/register
 * @param {function} middleware ['isUserNotAuthorized']
 * @param {function} controller - ['viewRegister']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/register', isUserNotAuthorized, viewRegister);

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
 * @description view login page
 * @param {string} path - /auth/users/login
 * @param {function} middleware ['isUserNotAuthorized']
 * @param {function} controller - ['viewLogin']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/login', isUserNotAuthorized, viewLogin);

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
 * @description view forgot password page
 * @param {string} path - /auth/users/forgot-password
 * @param {function} middleware ['isUserNotAuthorized']
 * @param {function} controller - ['viewForgotPassword']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/forgot-password', isUserNotAuthorized, viewForgotPassword);

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
 * @description view reset password page
 * @param {string} path - /auth/users/reset-password
 * @param {function} middleware ['isUserNotAuthorized']
 * @param {function} controller - ['viewResetPassword']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/reset-password', isUserNotAuthorized, viewResetPassword);

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
 * @description view resend verification email page
 * @param {string} path - /auth/users/resend-verification-email
 * @param {function} middleware ['isUserNotAuthorized']
 * @param {function} controller - ['viewResendVerificationEmail']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/resend-verification-email', isUserNotAuthorized, viewResendVerificationEmail);

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
 * @description view verify email page
 * @param {string} path - /auth/users/verify-email
 * @param {function} middleware ['isAuthorized']
 * @param {function} controller - ['viewVerifyEmail']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/verify-email', isAuthorized, viewVerifyEmail);

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

// export
module.exports = router;
