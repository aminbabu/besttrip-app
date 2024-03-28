/**
 * @file /routes/auth.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March 2024
 * @update_date 28 March 2024
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
 * @param {string} path - /users/register
 * @param {function} middleware - ['validateRegister']
 * @param {function} controller - ['register']
 * @returns {object} - router
 * @access public
 * @method POST
 * @example ['/users/register', '/users/register?redirect=/check-email']
 */
router.post('/register', auth.validateRegister, user.register);

/**
 * @description login a user
 * @param {string} path - /users/login
 * @param {function} middleware - ['validateLogin']
 * @param {function} controller - ['login']
 * @returns {object} - router
 * @access public
 * @method POST
 * @example ['/users/login', '/users/login?redirect=/dashboard']
 */
router.post('/login', auth.validateLogin, isVerified, user.login);

/**
 * @description forgot password
 * @param {string} path - /users/forgot-password
 * @param {function} middleware - ['validateForgotPassword']
 * @param {function} controller - ['forgotPassword']
 * @returns {object} - router
 * @access public
 * @method POST
 * @example ['/users/forgot-password', '/users/forgot-password?redirect=/check-email']
 */
router.post('/forgot-password', auth.validateForgotPassword, user.forgotPassword);

/**
 * @description reset password
 * @param {string} path - /users/reset-password
 * @param {function} middleware - ['validateResetPassword']
 * @param {function} controller - ['resetPassword']
 * @returns {object} - router
 * @access public
 * @method POST
 * @example [
 * '/users/reset-password?token=jwt-token',
 * '/users/reset-password?redirect=/dashboard'
 * ]
 */
router.post('/reset-password', auth.validateResetPassword, user.resetPassword);

/**
 * @description send verification email
 * @param {string} path - /users/send-verification-email
 * @param {function} middleware - ['validateSendVerificationEmail']
 * @param {function} controller - ['sendVerificationEmail']
 * @returns {object} - router
 * @access public
 * @method POST
 * @example [
 * '/users/send-verification-email',
 * '/users/send-verification-email?redirect=/check-email'
 * ]
 */
router.post(
    '/send-verification-email',
    auth.validateSendVerificationEmail,
    isAuthorized,
    user.sendVerificationEmail
);

/**
 * @description verify email
 * @param {string} path - /users/verify-email
 * @param {function} middleware - ['validateVerifyEmail']
 * @param {function} controller - ['verifyEmail']
 * @returns {object} - router
 * @access public
 * @method GET
 * @example ['/users/verify-email?token=jwt-token', '/users/verify-email?redirect=/dashboard]
 */
router.get('/verify-email', auth.validateVerifyEmail, user.verifyEmail);

// export
module.exports = router;
