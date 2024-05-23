/**
 * @file /routes/payment-requests/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 20 April, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    getPaymentRequests,
    getPaymentRequest,
    createPaymentRequest,
    updatePaymentRequest,
    deletePaymentRequest,
} = require('../../controllers/api/payment-requests');

// middlewares
const { isAuthorized, isAllowed } = require('../../middlewares/auth');
const {
    validatePaymentRequestId,
    validatePaymentRequest,
} = require('../../middlewares/validators/api/payment-requests');

/**
 * @description check if user is authorized
 * @param {string} path - '/payment-requests'
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @method USE
 */
router.use(isAuthorized);

/**
 * @description - get payment requests
 * @param {string} path - '/payment-requests'
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['getPaymentRequests']
 * @returns {object} - router
 * @access private ['admin']
 * @method GET
 */
router.get('/', isAllowed(['admin']), getPaymentRequests);

/**
 * @description - get payment request by id
 * @param {string} path - '/payment-requests/:id'
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validatePaymentRequestId']
 * @param {function} controller - ['getPaymentRequest']
 * @returns {object} - router
 * @access private ['admin']
 * @method GET
 */
router.get('/:id', isAllowed(['admin']), validatePaymentRequestId, getPaymentRequest);

/**
 * @description - create payment request
 * @param {string} path - '/payment-requests'
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validatePaymentRequest']
 * @param {function} controller - ['createPaymentRequest']
 * @returns {object} - router
 * @access private ['customer']
 * @method POST
 */
router.post('/', isAllowed(['customer']), validatePaymentRequest, createPaymentRequest);

/**
 * @description - update payment request
 * @param {string} path - '/payment-requests/:id'
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validatePaymentRequestId', 'validatePaymentRequest']
 * @param {function} controller - ['updatePaymentRequest']
 * @returns {object} - router
 * @access private ['admin']
 * @method PATCH
 */
router.patch(
    '/:id',
    isAllowed(['admin']),
    validatePaymentRequestId,
    validatePaymentRequest,
    updatePaymentRequest
);

/**
 * @description - delete payment request
 * @param {string} path - '/payment-requests/:id'
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validatePaymentRequestId']
 * @param {function} controller - ['deletePaymentRequest']
 * @returns {object} - router
 * @access private ['admin']
 * @method DELETE
 */
router.delete('/:id', isAllowed(['admin']), validatePaymentRequestId, deletePaymentRequest);

// export router
module.exports = router;
