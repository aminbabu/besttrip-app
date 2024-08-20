/**
 * @file /routes'/api/customers/index.js'
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 29 March, 2024
 * @update_date 19 Aug, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    getAllCustomers,
    getCustomer,
    createCustomer,
    updatePassword,
    disableCustomer,
    enableCustomer,
    updateAllCustomersWallet,
    updateCustomer,
    updateCustomerBySelf,
    updateCustomerWallet,
    deleteCustomer,
    deleteCustomerBySelf,
} = require('../../../controllers/api/customers');

// middlewares
const { isAuthorized, isAllowed } = require('../../../middlewares/api/auth');
const {
    validateCustomerId,
    validateCustomer,
    validatePassword,
    validateCustomerSelf,
    validateCustomerWallet,
    validateCustomerAccount,
} = require('../../../middlewares/api/validators/customers');
const { validateAvatar } = require('../../../middlewares/api/validators/files');
const { uploadAvatar } = require('../../../middlewares/api/files');

/**
 * @description check if customers is authorized
 * @param {string} path - '/api/customers'
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @method USE
 */
router.use(isAuthorized);

/**
 * @description get all customers
 * @param {string} path - '/api/customers'
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['getAllCustomers']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get('/', isAllowed(['admin']), getAllCustomers);

/**
 * @description get customer by mongo id
 * @param {string} path - '/api/customers/:id'
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateCustomerId']
 * @param {function} controller - ['getCustomer']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get('/:id', isAllowed(['admin']), validateCustomerId, getCustomer);

/**
 * @description create a new customer
 * @param {string} path - '/api/customers'
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validateCustomer']
 * @param {function} controller - ['createCustomer']
 * @returns {object} - router
 * @access private - ['admin']
 * @method POST
 */
router.post('/', isAllowed(['admin']), validateCustomer, createCustomer);

/**
 * @description update all customers wallet
 * @param {string} path - '/api/customers/wallet'
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateCustomerWallet']
 * @param {function} controller - ['updateAllCustomersWallet']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PATCH
 */
router.patch(
    '/wallet',
    isAllowed(['admin']),
    validateCustomerWallet,
    updateAllCustomersWallet
);

/**
 * @description update customer by self
 * @param {string} path - '/api/customers/self'
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
 * @param {string} path - '/api/customers/:id'
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
 * @description update customer wallet
 * @param {string} path - '/api/customers/:id/wallet'
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateCustomerId', 'validateCustomerWallet']
 * @param {function} controller - ['updateCustomerWallet']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PATCH
 */
router.patch(
    '/:id/wallet',
    isAllowed(['admin']),
    validateCustomerId,
    validateCustomerWallet,
    updateCustomerWallet
);

/**
 * @description disable customers by mongo id
 * @param {string} path - /api/customers/:id/disable
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} controller - ['disableCustomer']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get(
    '/:id/disable',
    isAllowed('admin'),
    validateCustomerId,
    disableCustomer
);

/**
 * @description enable customers by mongo id
 * @param {string} path - /api/customers/:id/enable
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} controller - ['enableCustomer']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get(
    '/:id/enable',
    isAllowed('admin'),
    validateCustomerId,
    enableCustomer
);

/**
 * @description update password by id
 * @param {string} path - /api/customers/:id/update-password
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validatePassword']
 * @param {function} controller - ['updatePassword']
 * @returns {object} - router
 * @access private - ['admin', 'customer']
 * @method PATCH
 */
router.patch(
    '/:id/update-password',
    isAllowed(['admin', 'customer']),
    validateCustomerId,
    validatePassword,
    updatePassword
);

/**
 * @description delete customer by mongo id
 * @param {string} path - '/api/customers/:id'
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
 * @param {string} path - '/api/customers/self'
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['deleteCustomerBySelf']
 * @returns {object} - router
 * @access private - ['customer']
 * @method DELETE
 */
router.delete('/', isAllowed(['customer']), deleteCustomerBySelf);

// export
module.exports = router;
