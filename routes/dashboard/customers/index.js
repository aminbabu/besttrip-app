/**
 * @file routes/customers/index.js
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
const {
    viewCustomers,
    viewCustomer,
} = require('../../../controllers/dashboard/customers');

// middlewares
const { isAuthorized } = require('../../../middlewares/dashboard/auth');

/**
 * @description check if customer is authorized
 * @param {string} path - '/customers'
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @method USE
 */
router.use(isAuthorized);

/**
 * @description - customers view route
 * @param {string} path - '/customers'
 * @param {function} controller - ['viewCustomers']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/', viewCustomers);

/**
 * @description - view customer view route
 * @param {string} path - '/customers/:id'
 * @param {function} controller - ['viewCustomer']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/:id', viewCustomer);

// export profile router
module.exports = router;
