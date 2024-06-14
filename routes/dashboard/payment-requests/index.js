/**
 * @file routes/dashboard/payment-requests/index.js
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
const { viewPaymentRequests } = require('../../../controllers/dashboard/payment-requests');

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
 * @description - profile view route
 * @param {string} path - '/dashboard/payment-requests/:status'
 * @param {function} controller - ['viewProfile']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/:status', viewPaymentRequests);

// export profile router
module.exports = router;
