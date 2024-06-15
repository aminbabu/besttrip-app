/**
 * @file routes/dashboard/umrah/types/index.js
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
const { viewUmrahTypes } = require('../../../../controllers/dashboard/umrah/types');

// middlewares
const { isAuthorized } = require('../../../../middlewares/dashboard/auth');

/**
 * @description check if user is authorized
 * @param {string} path - '/dashboard/payment-requests'
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @method USE
 */
router.use(isAuthorized);

/**
 * @description - umrah package types view route
 * @param {string} path - '/dashboard/umrah/types'
 * @param {function} controller - ['viewUmrahTypes']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/', viewUmrahTypes);

// export router
module.exports = router;
