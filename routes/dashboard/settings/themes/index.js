/**
 * @file routes/dashboard/settings/themes/index.js
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
const { viewThemes } = require('../../../../controllers/dashboard/settings/themes');

// middlewares
const { isAuthorized } = require('../../../../middlewares/dashboard/auth');

/**
 * @description check if user is authorized
 * @param {string} path - '/dashboard/settings/themes'
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @method USE
 */
router.use(isAuthorized);

/**
 * @description - themes view route
 * @param {string} path - '/dashboard/settings/themes'
 * @param {function} controller - ['viewThemes']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/', viewThemes);

// export router
module.exports = router;
