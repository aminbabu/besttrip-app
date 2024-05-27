/**
 * @file /routes/admin/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 22 May, 2024
 * @update_date 27 May, 2024
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
    logout,
} = require('../../../controllers/auth/users');
const { isAuthorized, isNotAuthorized } = require('../../../middlewares/auth');

/**
 * @description redirect to login page
 * @param {string} path - /admin/
 * @param {function} middleware - ['isNotAuthorized']
 * @param {function} controller - []
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/', (req, res) => res.redirect('/admin/login'));

/**
 * @description register a new user
 * @param {string} path - /admin/register
 * @param {function} middleware - ['isNotAuthorized']
 * @param {function} controller - ['register']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/register', isNotAuthorized, register);

/**
 * @description login a user
 * @param {string} path - /admin/login
 * @param {function} middleware - ['isNotAuthorized']
 * @param {function} controller - ['login']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/login', isNotAuthorized, login);

/**
 * @description forgot password
 * @param {string} path - /admin/forgot-password
 * @param {function} middleware - ['isNotAuthorized']
 * @param {function} controller - ['forgotPassword']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/forgot-password', isNotAuthorized, forgotPassword);

/**
 * @description reset password
 * @param {string} path - /admin/reset-password
 * @param {function} middleware - ['isNotAuthorized']
 * @param {function} controller - ['resetPassword']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/reset-password', isNotAuthorized, resetPassword);

/**
 * @description send verification email
 * @param {string} path - /admin/send-verification-email
 * @param {function} controller - ['sendVerificationEmail']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/send-verification-email', isAuthorized, sendVerificationEmail);

/**
 * @description verify email
 * @param {string} path - /admin/verify-email
 * @param {function} controller - ['verifyEmail']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/verify-email', verifyEmail);

/**
 * @description logout user
 * @param {string} path - /admin/logout
 * @param {function} controller - ['logout']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/logout', logout);

// export
module.exports = router;
