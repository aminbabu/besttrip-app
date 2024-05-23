/**
 * @file /routes/dashboard/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 24 May, 2024
 * @update_date 24 May, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const { getDashboard } = require('../../controllers/dashboard');

// middlewares
const { isAuthorized } = require('../../middlewares/auth');

/**
 * @description get dashboard
 * @param {string} path - '/dashboard'
 * @param {function} middleware - ['isAuthorized']
 * @param {function} controller - ['getDashboard']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get('/', isAuthorized, getDashboard);

// export router
module.exports = router;
