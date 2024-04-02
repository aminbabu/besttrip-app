/**
 * @file /routes/customers/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 29 March, 2024
 * @update_date 29 March, 2024
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
const { isAuthorized, isAllowed } = require('../../middlewares/auth');

/**
 * @description check if user is authorized
 * @param {string} path - /customers
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @returns {object} - router
 * @access private
 * @method USE
 */
router.use(isAuthorized, isAllowed(['admin']));

/**
 * @description get all customers
 * @param {string} path - /customers
 * @param {function} controller - ['getAllCustomers']
 * @returns {object} - router
 * @access private
 * @method GET
 */
router.get('/', getAllCustomers);

/**
 * @description get by mongo id
 * @param {string} path - /customers/:id
 * @param {function} controller - ['getCustomerById']
 * @returns {object} - router
 * @access private
 * @method GET
 */
router.get('/:id', getCustomerById);

/**
 * @description update customer by mongo id
 * @param {string} path - /customers/:id
 * @param {function} controller - ['updateCustomerById']
 * @returns {object} - router
 * @access private
 * @method PATCH
 */
router.patch('/:id', updateCustomerById);

/**
 * @description delete customer by mongo id
 * @param {string} path - /customers/:id
 * @param {function} controller - ['deleteCustomerById']
 * @returns {object} - router
 * @access private
 * @method DELETE
 */
router.delete('/:id', deleteCustomerById);

// export
module.exports = router;
