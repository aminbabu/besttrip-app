/**
 * @file /routes/dashboard/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 22 May, 2024
 * @update_date 03 June, 2024
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
    logout,
} = require('../../../controllers/auth/users');
const { isNotAuthorized } = require('../../../middlewares/auth');

/**
 * @description register a new user
 * @param {string} path - /dashboard/register
 * @param {function} middleware - ['isNotAuthorized']
 * @param {function} controller - ['register']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/register', isNotAuthorized, register);

/**
 * @description login a user
 * @param {string} path - /dashboard/login
 * @param {function} middleware - ['isNotAuthorized']
 * @param {function} controller - ['login']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/login', isNotAuthorized, login);

/**
 * @description forgot password
 * @param {string} path - /dashboard/forgot-password
 * @param {function} middleware - ['isNotAuthorized']
 * @param {function} controller - ['forgotPassword']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/forgot-password', isNotAuthorized, forgotPassword);

/**
 * @description reset password
 * @param {string} path - /dashboard/reset-password
 * @param {function} middleware - ['isNotAuthorized']
 * @param {function} controller - ['resetPassword']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/reset-password', isNotAuthorized, resetPassword);

/**
 * @description logout user
 * @param {string} path - /dashboard/logout
 * @param {function} controller - ['logout']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/logout', logout);

// export
module.exports = router;
