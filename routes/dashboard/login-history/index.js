/**
 * @file routes/login-history/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    viewLoginHistory,
    viewBlockedIps,
} = require('../../../controllers/dashboard/login-history');

// middlewares
const { isAuthorized } = require('../../../middlewares/dashboard/auth');

/**
 * @description check if user is authorized
 * @param {string} path - '/login-history'
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @method USE
 */
router.use(isAuthorized);

/**
 * @description - login history view route
 * @param {string} path - '/login-history'
 * @param {function} controller - ['viewLoginHistory']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/', viewLoginHistory);

/**
 * @description - blocked ip view route
 * @param {string} path - '/login-history/blocked-ips'
 * @param {function} controller - ['viewBlockedIps']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/blocked-ips', viewBlockedIps);

// export router
module.exports = router;
