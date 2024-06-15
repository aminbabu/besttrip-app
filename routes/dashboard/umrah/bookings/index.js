/**
 * @file routes/dashboard/umrah/bookings/index.js
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
const { viewUmrahBookings } = require('../../../../controllers/dashboard/umrah/bookings');

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
 * @description - umrah bookings view route
 * @param {string} path - '/dashboard/umrah/booking/:status'
 * @param {function} controller - ['viewUmrahBookings']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/:status', viewUmrahBookings);

// export router
module.exports = router;
