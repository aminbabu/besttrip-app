/**
 * @file routes/settings/content/exclusive-offers/index.js
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
    viewExclusiveOffers,
} = require('../../../../../controllers/dashboard/settings/content/exclusive-offers');

// middlewares
const { isAuthorized } = require('../../../../../middlewares/dashboard/auth');

/**
 * @description check if user is authorized
 * @param {string} path - '/settings/content/exclusive-offers'
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @method USE
 */
router.use(isAuthorized);

/**
 * @description - payments view route
 * @param {string} path - '/settings/content/exclusive-offers'
 * @param {function} controller - ['viewExclusiveOffers']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/', viewExclusiveOffers);

// export router
module.exports = router;
