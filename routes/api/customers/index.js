/**
 * @file /routes/api/customers/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 29 March, 2024
 * @update_date 03 June, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    getAllCustomers,
    getCustomer,
    updateAllCustomersWallet,
    updateCustomer,
    updateCustomerBySelf,
    deleteCustomer,
    deleteCustomerBySelf,
} = require('../../../controllers/api/customers');

// middlewares
const { isAuthorized, isAllowed } = require('../../../middlewares/api/auth');
const {
    validateCustomerId,
    validateCustomer,
    validateCustomerSelf,
    validateCustomerWallet,
    validateCustomerAccount,
} = require('../../../middlewares/api/validators/customers');
const { validateAvatar } = require('../../../middlewares/api/validators/files');
const { uploadAvatar } = require('../../../middlewares/api/files');

/**
 * @description check if user is authorized
 * @param {string} path - /customers
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
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
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateCustomerId']
 * @param {function} controller - ['getCustomer']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get('/:id', isAllowed(['admin']), validateCustomerId, getCustomer);

/**
 * @description update all customers wallet
 * @param {string} path - /customers/wallet
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateCustomerWallet']
 * @param {function} controller - ['updateAllCustomers']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PATCH
 */
router.patch('/wallet', isAllowed(['admin']), validateCustomerWallet, updateAllCustomersWallet);

/**
 * @description update customer by self
 * @param {string} path - /customers/self
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateAvatar', 'validateCustomerAccount']
 * @param {function} validator - ['validateCustomerSelf']
 * @param {function} controller - ['updateCustomerBySelf']
 * @returns {object} - router
 * @access private - ['customer']
 * @method PATCH
 */
router.patch(
    '/self',
    isAllowed(['customer']),
    validateAvatar,
    validateCustomerAccount,
    validateCustomerSelf,
    uploadAvatar('avatars/customers'),
    updateCustomerBySelf
);

/**
 * @description update customer by mongo id
 * @param {string} path - /customers/:id
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateAvatar', 'validateCustomerAccount']
 * @param {function} validator - ['validateCustomerId', 'validateCustomer']
 * @param {function} middleware - ['uploadAvatar']
 * @param {function} controller - ['updateCustomer']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PATCH
 */
router.patch(
    '/:id',
    isAllowed(['admin']),
    validateAvatar,
    validateCustomerAccount,
    validateCustomerId,
    validateCustomer,
    uploadAvatar('avatars/customers'),
    updateCustomer
);

/**
 * @description delete customer by mongo id
 * @param {string} path - /customers/:id
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateCustomerId']
 * @param {function} controller - ['deleteCustomer']
 * @returns {object} - router
 * @access private - ['admin']
 * @method DELETE
 */
router.delete('/:id', isAllowed(['admin']), validateCustomerId, deleteCustomer);

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
