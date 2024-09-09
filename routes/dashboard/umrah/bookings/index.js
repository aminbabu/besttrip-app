/**
 * @file routes/umrah/bookings/index.js
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
    viewUmrahBookings,
    bookingDetails,
} = require('../../../../controllers/dashboard/umrah/bookings');

// middlewares
const { isAuthorized } = require('../../../../middlewares/dashboard/auth');

/**
 * @description check if user is authorized
 * @param {string} path - '/umrah/bookings'
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @method USE
 */
router.use(isAuthorized);

/**
 * @description - umrah booking view route
 * @param {string} path - '/umrah/bookings/booking-details/:id'
 * @param {function} controller - ['bookingDetails']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/booking-details/:id', bookingDetails);

/**
 * @description - umrah bookings view route
 * @param {string} path - '/umrah/bookings/:status'
 * @param {function} controller - ['viewUmrahBookings']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/:status', viewUmrahBookings);

// export router
module.exports = router;
