/**
 * @file /routes/api/payment-requests/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 16 June, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    getPaymentRequests,
    getPaymentRequest,
    getPaymentRequestsByStatus,
    createPaymentRequest,
    updatePaymentRequest,
    deletePaymentRequest,
} = require('../../../controllers/api/payment-requests');

// middlewares
const { isAuthorized, isAllowed } = require('../../../middlewares/api/auth');
const {
    validatePaymentRequestId,
    validatePaymentRequest,
    validatePaymentRequestStatusNote,
    validatePaymentRequestsByStatus,
    validatePaymentRequestAttachment,
} = require('../../../middlewares/api/validators/payment-requests');
const { uploadPaymentAttachment } = require('../../../middlewares/api/payment-requests');

/**
 * @description check if user is authorized
 * @param {string} path - '/api/payment-requests'
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @method USE
 */
router.use(isAuthorized);

/**
 * @description - get payment requests
 * @param {string} path - '/api/payment-requests'
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['getPaymentRequests']
 * @returns {object} - router
 * @access private ['admin']
 * @method GET
 */
router.get('/', isAllowed(['admin']), getPaymentRequests);

/**
 * @description - get payment request by id
 * @param {string} path - '/api/payment-requests/:id'
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validatePaymentRequestId']
 * @param {function} controller - ['getPaymentRequest']
 * @returns {object} - router
 * @access private ['admin']
 * @method GET
 */
router.get('/:id', isAllowed(['admin']), validatePaymentRequestId, getPaymentRequest);

/**
 * @description - get payment requests by status
 * @param {string} path - '/api/payment-requests/status/:status'
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['getPaymentRequestsByStatus']
 * @returns {object} - router
 * @access private ['admin']
 * @method GET
 */
router.get(
    '/status/:status',
    isAllowed(['admin']),
    validatePaymentRequestsByStatus,
    getPaymentRequestsByStatus
);

/**
 * @description - create payment request
 * @param {string} path - '/api/payment-requests'
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validatePaymentRequest']
 * @param {function} controller - ['createPaymentRequest']
 * @returns {object} - router
 * @access private ['customer']
 * @method POST
 */
router.post(
    '/',
    isAllowed(['customer']),
    validatePaymentRequestAttachment,
    validatePaymentRequest,
    uploadPaymentAttachment('payment-requests'),
    createPaymentRequest
);

/**
 * @description - update payment request
 * @param {string} path - '/api/payment-requests/:id'
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
    validatePaymentRequestStatusNote,
    updatePaymentRequest
);

/**
 * @description - delete payment request
 * @param {string} path - '/api/payment-requests/:id'
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
