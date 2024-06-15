/**
 * @file routes/dashboard/umrah-booking/index.js
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
const { viewUmrahBooking } = require('../../../../controllers/dashboard/umrah/booking');

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
 * @param {string} path - '/dashboard/umrah-booking/:status'
 * @param {function} controller - ['viewUmrahBooking']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/:status', viewUmrahBooking);

// export router
module.exports = router;
