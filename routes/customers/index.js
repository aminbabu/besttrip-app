/**
 * @file /routes/customers/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 29 March 2024
 * @update_date 29 March 2024
 */

// dependencies
const express = require('express');

const router = express.Router();

// controllers
const {
    getAllCustomers,
    getCustomerById,
    updateCustomerById,
    deleteCustomerById,
} = require('../../controllers/customers');

// middlewares
// const { customers } = require('../../middlewares/validators');
const { isAuthorized } = require('../../middlewares/auth');

/**
 * @description get all customers
 * @param {string} path - /customers/
 * @param {function} middleware - ['isAuthorized']
 * @param {function} controller - ['getAllCustomers']
 * @returns {object} - router
 * @access private
 * @method GET
 */
router.get('/', isAuthorized, getAllCustomers);

/**
 * @description get by mongo id
 * @param {string} path - /customers/:id
 * @param {function} middleware - ['isAuthorized']
 * @param {function} controller - ['getCustomerById']
 * @returns {object} - router
 * @access private
 * @method GET
 */
router.get('/:id', isAuthorized, getCustomerById);

/**
 * @description update customer by mongo id
 * @param {string} path - /customers/:id
 * @param {function} middleware - ['isAuthorized']
 * @param {function} controller - ['updateCustomerById']
 * @returns {object} - router
 * @access private
 * @method PATCH
 */
router.patch('/:id', isAuthorized, updateCustomerById);

/**
 * @description delete customer by mongo id
 * @param {string} path - /customers/:id
 * @param {function} middleware - ['isAuthorized']
 * @param {function} controller - ['deleteCustomerById']
 * @returns {object} - router
 * @access private
 * @method DELETE
 */
router.delete('/:id', isAuthorized, deleteCustomerById);

// export
module.exports = router;
