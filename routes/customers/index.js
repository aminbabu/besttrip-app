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
    updateAllCustomers,
    updateCustomerById,
    updateCustomerBySelf,
    deleteCustomerById,
} = require('../../controllers/customers');

// middlewares
const { isAuthorized, isAllowed, isSelf } = require('../../middlewares/auth');
const { updateCustomer } = require('../../middlewares/validators/customers');

/**
 * @description check if user is authorized
 * @param {string} path - /customers
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @access private
 * @method USE
 */
router.use(isAuthorized);

/**
 * @description get all customers
 * @param {string} path - /customers
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['getAllCustomers']
 * @returns {object} - router
 * @access private
 * @method GET
 */
router.get('/', isAllowed(['admin']), getAllCustomers);

/**
 * @description get by mongo id
 * @param {string} path - /customers/:id
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['getCustomerById']
 * @returns {object} - router
 * @access private
 * @method GET
 */
router.get('/:id', isAllowed(['admin']), getCustomerById);

/**
 * @description update all customers
 * @param {string} path - /customers
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['updateAllCustomers']
 * @returns {object} - router
 * @access private
 * @method PATCH
 */
router.patch('/', isAllowed(['admin']), updateCustomer, updateAllCustomers);

/**
 * @description update customer by mongo id
 * @param {string} path - /customers/:id
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['updateCustomerById']
 * @returns {object} - router
 * @access private
 * @method PATCH
 */
router.patch('/:id', isAllowed(['admin']), updateCustomer, updateCustomerById);

/**
 * @description update customer by self
 * @param {string} path - /customers/:id
 * @param {function} middleware - ['isSelf']
 * @param {function} controller - ['updateCustomerBySelf']
 * @returns {object} - router
 * @access private
 * @method PATCH
 */
router.patch('/:id/self', isSelf, isAllowed(['customer']), updateCustomer, updateCustomerBySelf);

/**
 * @description delete customer by mongo id
 * @param {string} path - /customers/:id
 * @param {function} controller - ['deleteCustomerById']
 * @returns {object} - router
 * @access private
 * @method DELETE
 */
router.delete('/:id', isAllowed(['admin']), deleteCustomerById);

// export
module.exports = router;
