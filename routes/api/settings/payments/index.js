/**
 * @file /routes/api/settings/payments/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 18 May, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    getPayments,
    getPayment,
    createPayment,
    updatePayment,
    deletePayment,
    updatePaymentStatus,
    deleteManyPayments,
} = require('../../../../controllers/api/settings/payments');

// middlewares
const { isAuthorized, isAllowed } = require('../../../../middlewares/api/auth');
const {
    validatePaymentId,
    validatePaymentIds,
    validatePayment,
    validatePaymentStatus,
} = require('../../../../middlewares/api/validators/settings/payments');

/**
 * @description - get payments settings
 * @param {string} path - '/api/settings/payments'
 * @param {function} controller - ['getPayment']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/', getPayments);

/**
 * @description - get payments settings by id
 * @param {string} path - '/api/settings/payments/:id'
 * @param {function} validator - ['validatePaymentId']
 * @param {function} controller - ['getPayment']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/:id', validatePaymentId, getPayment);

/**
 * @description - create payments settings
 * @param {string} path - '/api/settings/payments'
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validatePayment']
 * @param {function} controller - ['createPayment']
 * @returns {object} - router
 * @access private - ['admin']
 * @method POST
 */
router.post(
    '/',
    isAuthorized,
    isAllowed('admin'),
    validatePayment,
    createPayment
);

/**
 * @description - update payments settings
 * @param {string} path - '/api/settings/payments/:id'
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validatePaymentId', 'validatePayment']
 * @param {function} controller - ['updatePayment']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PATCH
 */
router.patch(
    '/:id',
    isAuthorized,
    isAllowed('admin'),
    validatePaymentId,
    validatePayment,
    updatePayment
);

/**
 * @description - update payments settings status
 * @param {string} path - '/api/settings/payments/:id/status'
 * @param {function} validator - ['validatePaymentId', 'validatePaymentStatus']
 * @param {function} controller - ['updatePaymentStatus']
 * @returns {object} - router
 * @access private ['admin']
 * @method PATCH
 */
router.patch(
    '/:id/status',
    isAuthorized,
    isAllowed(['admin']),
    validatePaymentId,
    validatePaymentStatus,
    updatePaymentStatus
);

/**
 * @description - delete many payments settings by IDs
 * @param {string} path - '/api/settings/content/payments/delete-many'
 * @param {function} middleware - ['validatePaymentIds']
 * @param {function} controller - ['deleteManyPayments']
 * @returns {object} - router
 * @access private ['admin']
 * @method DELETE
 */
router.delete(
    '/delete-many',
    isAuthorized,
    isAllowed(['admin']),
    validatePaymentIds,
    deleteManyPayments
);

/**
 * @description - delete payments settings
 * @param {string} path - '/api/settings/payments/:id'
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validatePaymentId']
 * @param {function} controller - ['deletePayment']
 * @returns {object} - router
 * @access private - ['admin']
 * @method DELETE
 */
router.delete(
    '/:id',
    isAuthorized,
    isAllowed('admin'),
    validatePaymentId,
    deletePayment
);

// export router
module.exports = router;
