/**
 * @file routes/roles/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 June, 2024
 * @update_date 14 June, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const { viewRoles } = require('../../../controllers/dashboard/roles');

// middlewares
const { isAuthorized } = require('../../../middlewares/dashboard/auth');

/**
 * @description check if user is authorized
 * @param {string} path - '/roles'
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @method USE
 */
router.use(isAuthorized);

/**
 * @description - user roles view route
 * @param {string} path - '/roles'
 * @param {function} controller - ['viewRoles']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/', viewRoles);

// export profile router
module.exports = router;
