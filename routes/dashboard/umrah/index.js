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
const {
    viewUmrahBooking,
    viewUmrahTypes,
    viewUmrahDurations,
    viewUmrahPackages,
    viewAddUmrahPackage,
    viewEditUmrahPackage,
} = require('../../../controllers/dashboard/umrah');

// middlewares
const { isAuthorized } = require('../../../middlewares/dashboard/auth');

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
 * @param {function} controller - ['viewUmrahBooking']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/booking/:status', viewUmrahBooking);

/**
 * @description - umrah package types view route
 * @param {string} path - '/dashboard/umrah/types'
 * @param {function} controller - ['viewUmrahTypes']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/types', viewUmrahTypes);

/**
 * @description - umrah package durations view route
 * @param {string} path - '/dashboard/umrah/durations'
 * @param {function} controller - ['viewUmrahDurations']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/durations', viewUmrahDurations);

/**
 * @description - umrah packages view route
 * @param {string} path - '/dashboard/umrah/packages'
 * @param {function} controller - ['viewUmrahPackages']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/packages', viewUmrahPackages);

/**
 * @description - umrah package add view route
 * @param {string} path - '/dashboard/umrah/package/add'
 * @param {function} controller - ['viewAddUmrahPackage']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/packages/add', viewAddUmrahPackage);

/**
 * @description - umrah package edit view route
 * @param {string} path - '/dashboard/umrah/package/edit/:id'
 * @param {function} controller - ['viewEditUmrahPackage']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/packages/:id', viewEditUmrahPackage);

// export router
module.exports = router;
