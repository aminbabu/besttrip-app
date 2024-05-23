/**
 * @file /routes/auth/users/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 22 May, 2024
 * @update_date 24 May, 2024
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
const isNotAuthorized = require('../../../middlewares/auth/is-not-authorized');
const { isAuthorized } = require('../../../middlewares/auth');

/**
 * @description register a new user
 * @param {string} path - /auth/users/register
 * @param {function} middleware - ['isNotAuthorized']
 * @param {function} controller - ['register']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/register', isNotAuthorized, register);

/**
 * @description login a user
 * @param {string} path - /auth/users/login
 * @param {function} middleware - ['isNotAuthorized']
 * @param {function} controller - ['login']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/login', isNotAuthorized, login);

/**
 * @description forgot password
 * @param {string} path - /auth/users/forgot-password
 * @param {function} controller - ['forgotPassword']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/forgot-password', forgotPassword);

/**
 * @description reset password
 * @param {string} path - /auth/users/reset-password
 * @param {function} controller - ['resetPassword']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/reset-password', resetPassword);

/**
 * @description send verification email
 * @param {string} path - /auth/users/send-verification-email
 * @param {function} controller - ['sendVerificationEmail']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/send-verification-email', isAuthorized, sendVerificationEmail);

/**
 * @description verify email
 * @param {string} path - /auth/users/verify-email
 * @param {function} controller - ['verifyEmail']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/verify-email', verifyEmail);

// export
module.exports = router;
