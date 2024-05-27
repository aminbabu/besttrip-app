/**
 * @file /routes/umrah/package-durations/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 09 May, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    getUmrahPackageDurations,
    getUmrahPackageDuration,
    createUmrahPackageDuration,
    updateUmrahPackageDuration,
    deleteUmrahPackageDuration,
} = require('../../../controllers/api/umrah/package-durations');

// middlewares
const { isAuthorized, isAllowed } = require('../../../middlewares/auth');
const {
    validateUmrahPackageDurationId,
    validateUmrahPackageDuration,
} = require('../../../middlewares/validators/umrah/package-durations');

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
router.get('/', isAllowed(['admin']), getUmrahPackageDurations);

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
router.get('/:id', isAllowed(['admin']), validateUmrahPackageDurationId, getUmrahPackageDuration);

/**
 * @description create umrah package duration
 * @param {string} path - /umrah/package-durations
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['createUmrahPackageDuration']
 * @returns {object} - router
 * @access private - ['admin']
 * @method POST
 */
router.post('/', isAllowed(['admin']), validateUmrahPackageDuration, createUmrahPackageDuration);

/**
 * @description update umrah package duration
 * @param {string} path - /umrah/package-durations/:id
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateUmrahPackageDurationId', 'validateUmrahPackageDuration']
 * @param {function} controller - ['updateUmrahPackageDuration']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PUT
 */
router.put(
    '/:id',
    isAllowed(['admin']),
    validateUmrahPackageDurationId,
    validateUmrahPackageDuration,
    updateUmrahPackageDuration
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
