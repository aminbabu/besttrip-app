/**
 * @file /routes/api/umrah/package-durations/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 18 May, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    getUmrahPackageDurations,
    getUmrahPackageDurationsCustomer,
    getUmrahPackageDuration,
    createUmrahPackageDuration,
    updateUmrahPackageDuration,
    deleteUmrahPackageDuration,
    updateUmrahPackageDurationStatus,
} = require('../../../../controllers/api/umrah/package-durations');

// middlewares
const { isAuthorized, isAllowed } = require('../../../../middlewares/api/auth');
const {
    validateUmrahPackageDurationId,
    validateUmrahPackageDurationStatus,
    validateUmrahPackageDuration,
} = require('../../../../middlewares/api/validators/umrah/package-durations');

/**
 * @description get all umrah package durations for customers (no middleware)
 * @param {string} path - /umrah/package-durations/customer
 * @param {function} controller - ['getUmrahPackageDurations']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/customer', getUmrahPackageDurationsCustomer);

/**
 * @description check if user is authorized
 * @param {string} path - /customers
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @method USE
 */
router.use(isAuthorized);

/**
 * @description get all umrah package durations
 * @param {string} path - /umrah/package-durations
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['getUmrahPackageDurations']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get('/', isAllowed(['admin', 'customer']), getUmrahPackageDurations);

/**
 * @description get umrah package duration
 * @param {string} path - /umrah/package-durations/:id
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateUmrahPackageDurationId']
 * @param {function} controller - ['getUmrahPackageDuration']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get(
    '/:id',
    isAllowed(['admin']),
    validateUmrahPackageDurationId,
    getUmrahPackageDuration
);

/**
 * @description create umrah package duration
 * @param {string} path - /umrah/package-durations
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['createUmrahPackageDuration']
 * @returns {object} - router
 * @access private - ['admin']
 * @method POST
 */
router.post(
    '/',
    isAllowed(['admin']),
    validateUmrahPackageDuration,
    createUmrahPackageDuration
);

/**
 * @description update umrah package duration
 * @param {string} path - /umrah/package-durations/:id
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateUmrahPackageDurationId', 'validateUmrahPackageDuration']
 * @param {function} controller - ['updateUmrahPackageDuration']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PATCH
 */
router.patch(
    '/:id',
    isAllowed(['admin']),
    validateUmrahPackageDurationId,
    validateUmrahPackageDuration,
    updateUmrahPackageDuration
);

/**
 * @description - update umrah package duration status
 * @param {string} path - /umrah/package-durations/:id/status
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateUmrahPackageDurationId', 'validateUmrahPackageDurationStatus']
 * @param {function} controller - ['updateUmrahPackageDurationStatus']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PATCH
 */
router.patch(
    '/:id/status',
    isAuthorized,
    isAllowed(['admin']),
    validateUmrahPackageDurationId,
    validateUmrahPackageDurationStatus,
    updateUmrahPackageDurationStatus
);

/**
 * @description delete umrah package duration
 * @param {string} path - /umrah/package-durations/:id
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateUmrahPackageDurationId']
 * @param {function} controller - ['deleteUmrahPackageDuration']
 * @returns {object} - router
 * @access private - ['admin']
 * @method DELETE
 */
router.delete(
    '/:id',
    isAllowed(['admin']),
    validateUmrahPackageDurationId,
    deleteUmrahPackageDuration
);

// export router
module.exports = router;
