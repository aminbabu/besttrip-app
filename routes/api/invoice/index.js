/**
 * @file routes/api/invoice/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 01 August, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    getInvoiceForAdmin,
    getInvoiceForCustomer,
    getAllInvoicesForAdmin,
    updatePartialPaymentTimeLimit,
} = require('../../../controllers/api/invoice');

// middlewares
const { isAuthorized, isAllowed } = require('../../../middlewares/api/auth');
const {
    validateInvoiceId,
    validatePartialPaymentTimeLimit,
} = require('../../../middlewares/api/validators/invoice');

/**
 * @description check if user is authorized
 * @param {string} path - /api/invoice
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @method USE
 */
router.use(isAuthorized);

/**
 * @description get all invoices for admin
 * @param {string} path - /api/invoice/admin
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['getAllInvoicesForAdmin']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get('/admin', isAllowed(['admin']), getAllInvoicesForAdmin);

/**
 * @description get invoice for admin
 * @param {string} path - /api/invoice/:id/admin
 * @param {function} middleware - ['isAllowed', 'validateInvoiceId']
 * @param {function} controller - ['getInvoiceForAdmin']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get(
    '/:id/admin',
    isAllowed(['admin']),
    validateInvoiceId,
    getInvoiceForAdmin
);

/**
 * @description get invoice for customer
 * @param {string} path - /api/invoice/:id/customer
 * @param {function} middleware - ['isAllowed', 'validateInvoiceId']
 * @param {function} controller - ['getInvoiceForCustomer']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get(
    '/:id/customer',
    isAllowed(['customer']),
    validateInvoiceId,
    getInvoiceForCustomer
);

/**
 * @description - update partial payment time limit
 * @param {string} path - '/api/invoice/:id/partial-payment-time-limit'
 * @param {function} middleware - ['isAllowed', 'validateInvoiceId']
 * @param {function} controller - ['updatePartialPaymentTimeLimit']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PATCH
 */
router.patch(
    '/:id/partial-payment-time-limit',
    isAllowed(['admin']),
    validateInvoiceId,
    validatePartialPaymentTimeLimit,
    updatePartialPaymentTimeLimit
);

// export router
module.exports = router;
