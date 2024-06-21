/**
 * @file routes/dashboard/settings/site/index.js
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
const { viewSite } = require('../../../../controllers/dashboard/settings/site');

// middlewares
const { isAuthorized } = require('../../../../middlewares/dashboard/auth');

/**
 * @description check if user is authorized
 * @param {string} path - '/dashboard/settings/site'
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @method USE
 */
router.use(isAuthorized);

/**
 * @description - site view route
 * @param {string} path - '/dashboard/settings/site'
 * @param {function} controller - ['viewSite']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/', viewSite);

// export router
module.exports = router;
