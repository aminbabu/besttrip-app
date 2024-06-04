/**
 * @file routes/dashboard/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 June, 2024
 * @update_date 03 June, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const { viewDashboard } = require('../../controllers/dashboard/home');

// middlewares
const { isAuthorized } = require('../../middlewares/dashboard/auth');

/**
 * @description - dashboard view route
 * @param {string} path - '/dashboard'
 * @param {function} middleware - ['isAuthorized']
 * @param {function} controller - ['viewDashboard']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/', isAuthorized, viewDashboard);

/**
 * @description - admin route
 * @param {string} path - '/dashboard/admin'
 * @param {function} controller - []
 * @returns {object} - router
 * @access private - []
 * @method GET
 */
router.get('/login', (req, res) => res.redirect('/auth/users/login'));

// export dashboard router
module.exports = router;
