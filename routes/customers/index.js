/**
 * @file /routes/customers/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 29 March, 2024
 * @update_date 13 April, 2024
 */

// dependencies
const express = require('express');

const router = express.Router();

// controllers
const {
    getAllCustomers,
    getCustomerById,
    updateAllCustomersWallet,
    updateCustomerById,
    updateCustomerBySelf,
    deleteCustomerById,
    deleteCustomerBySelf,
} = require('../../controllers/customers');

// middlewares
const { isAuthorized, isAllowed } = require('../../middlewares/auth');
const {
    validateCustomerId,
    validateCustomer,
    validateCustomerSelf,
    validateCustomerWallet,
} = require('../../middlewares/validators/customers');
const { validateAvatar } = require('../../middlewares/validators/files');
const { validateExistedAccount } = require('../../middlewares/validators/global');
const { uploadAvatar } = require('../../middlewares/files');

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
 * @access private - ['admin']
 * @method GET
 */
router.get('/', isAllowed(['admin']), getAllCustomers);

/**
 * @description get customer by mongo id
 * @param {string} path - /customers/:id
 * @param {function} middleware - ['isAllowed', 'validateCustomerId']
 * @param {function} controller - ['getCustomerById']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get('/:id', isAllowed(['admin']), validateCustomerId, getCustomerById);

/**
 * @description update all customers wallet
 * @param {string} path - /customers/wallet
 * @param {function} middleware - ['isAllowed', 'validateCustomerWallet']
 * @param {function} controller - ['updateAllCustomers']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PATCH
 */
router.patch('/wallet', isAllowed(['admin']), validateCustomerWallet, updateAllCustomersWallet);

/**
 * @description update customer by self
 * @param {string} path - /customers/self
 * @param {function} middleware - ['isAllowed', 'validateCustomerSelf']
 * @param {function} controller - ['updateCustomerBySelf']
 * @returns {object} - router
 * @access private - ['customer']
 * @method PATCH
 */
router.patch(
    '/self',
    isAllowed(['customer']),
    validateAvatar,
    validateExistedAccount,
    validateCustomerSelf,
    uploadAvatar('customers'),
    updateCustomerBySelf
);

/**
 * @description update customer by mongo id
 * @param {string} path - /customers/:id
 * @param {function} middleware - ['isAllowed', 'validateCustomer']
 * @param {function} controller - ['updateCustomerById']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PATCH
 */
router.patch(
    '/:id',
    isAllowed(['admin']),
    validateCustomerId,
    validateAvatar,
    validateExistedAccount,
    validateCustomer,
    uploadAvatar('customers'),
    updateCustomerById
);

/**
 * @description delete customer by mongo id
 * @param {string} path - /customers/:id
 * @param {function} middleware - ['isAllowed', 'validateCustomerId']
 * @param {function} controller - ['deleteCustomerById']
 * @returns {object} - router
 * @access private - ['admin']
 * @method DELETE
 */
router.delete('/:id', isAllowed(['admin']), validateCustomerId, deleteCustomerById);

/**
 * @description delete customer by self
 * @param {string} path - /customers/self
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['deleteCustomerBySelf']
 * @returns {object} - router
 * @access private - ['customer']
 * @method DELETE
 */
router.delete('/', isAllowed(['customer']), deleteCustomerBySelf);

// export
module.exports = router;
