/**
 * @file /routes/settings/payments/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 19 April, 2024
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
} = require('../../../controllers/api/settings/payments');

// middlewares
const { isAuthorized, isAllowed } = require('../../../middlewares/api/auth');
const {
    validatePaymentId,
    validatePayment,
} = require('../../../middlewares/validators/api/settings/payments');

/**
 * @description - get payments settings
 * @param {string} path - '/settings/payments'
 * @param {function} controller - ['getPayment']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/', getPayments);

/**
 * @description - get payments settings by id
 * @param {string} path - '/settings/payments/:id'
 * @param {function} validator - ['validatePaymentId']
 * @param {function} controller - ['getPayment']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/:id', validatePaymentId, getPayment);

/**
 * @description - create payments settings
 * @param {string} path - '/settings/payments'
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validatePayment']
 * @param {function} controller - ['createPayment']
 * @returns {object} - router
 * @access private - ['admin']
 * @method POST
 */
router.post('/', isAuthorized, isAllowed('admin'), validatePayment, createPayment);

/**
 * @description - update payments settings
 * @param {string} path - '/settings/payments/:id'
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
 * @description - delete payments settings
 * @param {string} path - '/settings/payments/:id'
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validatePaymentId']
 * @param {function} controller - ['deletePayment']
 * @returns {object} - router
 * @access private - ['admin']
 * @method DELETE
 */
router.delete('/:id', isAuthorized, isAllowed('admin'), validatePaymentId, deletePayment);

// export router
module.exports = router;
