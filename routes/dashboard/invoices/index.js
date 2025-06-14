/**
 * @file routes/invoice/index.js
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
const { viewInvoices } = require('../../../controllers/dashboard/invoices');

// middlewares
const { isAuthorized } = require('../../../middlewares/dashboard/auth');

/**
 * @description check if user is authorized
 * @param {string} path - '/invoices'
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @method USE
 */
router.use(isAuthorized);

/**
 * @description - invoices view route
 * @param {string} path - '/invoices'
 * @param {function} controller - ['viewInvoices']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/', viewInvoices);

// export router
module.exports = router;
