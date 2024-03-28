/**
 * @file /routes/auth.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 March 2024
 * @update_date 28 March 2024
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
 * @param {string} path - /customers/register
 * @param {function} middleware - ['validateRegister']
 * @param {function} controller - ['register']
 * @returns {object} - router
 * @access public
 * @method POST
 * @example ['/customers/register', '/customers/register?redirect=/check-email']
 */
router.post('/register', auth.validateRegister, customer.register);

/**
 * @description login a user
 * @param {string} path - /customers/login
 * @param {function} middleware - ['validateLogin']
 * @param {function} controller - ['login']
 * @returns {object} - router
 * @access public
 * @method POST
 * @example ['/customers/login', '/customers/login?redirect=/dashboard']
 */
router.post('/login', auth.validateLogin, isVerified, customer.login);

/**
 * @description forgot password
 * @param {string} path - /customers/forgot-password
 * @param {function} middleware - ['validateForgotPassword']
 * @param {function} controller - ['forgotPassword']
 * @returns {object} - router
 * @access public
 * @method POST
 * @example ['/customers/forgot-password', '/customers/forgot-password?redirect=/check-email']
 */
router.post('/forgot-password', auth.validateForgotPassword, customer.forgotPassword);

/**
 * @description reset password
 * @param {string} path - /customers/reset-password
 * @param {function} middleware - ['validateResetPassword']
 * @param {function} controller - ['resetPassword']
 * @returns {object} - router
 * @access public
 * @method POST
 * @example [
 * '/customers/reset-password?token=jwt-token',
 * '/customers/reset-password?redirect=/dashboard'
 * ]
 */
router.post('/reset-password', auth.validateResetPassword, customer.resetPassword);

/**
 * @description send verification email
 * @param {string} path - /customers/send-verification-email
 * @param {function} middleware - ['validateSendVerificationEmail']
 * @param {function} controller - ['sendVerificationEmail']
 * @returns {object} - router
 * @access public
 * @method POST
 * @example [
 * '/customers/send-verification-email',
 * '/customers/send-verification-email?redirect=/check-email'
 * ]
 */
router.post(
    '/send-verification-email',
    auth.validateSendVerificationEmail,
    isAuthorized,
    customer.sendVerificationEmail
);

/**
 * @description verify email
 * @param {string} path - /customers/verify-email
 * @param {function} middleware - ['validateVerifyEmail']
 * @param {function} controller - ['verifyEmail']
 * @returns {object} - router
 * @access public
 * @method GET
 * @example [
 * '/customers/verify-email?token=jwt-token',
 * '/customers/verify-email?redirect=/dashboard
 * ]
 */
router.get('/verify-email', auth.validateVerifyEmail, customer.verifyEmail);

// export
module.exports = router;
