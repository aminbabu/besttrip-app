/**
 * @file /routes/api/umrah/package-types/index.js
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
    getUmrahPackageTypes,
    getUmrahPackageTypesCustomers,
    getUmrahPackageType,
    createUmrahPackageType,
    updateUmrahPackageType,
    deleteUmrahPackageType,
    updateUmrahPackageTypeStatus,
    deleteManyUmrahPackageType,
} = require('../../../../controllers/api/umrah/package-types');

// middlewares
const { isAuthorized, isAllowed } = require('../../../../middlewares/api/auth');
const {
    validateUmrahPackageTypeId,
    validateUmrahPackageTypeIds,
    validateUmrahPackageType,
    validateUmrahPackageTypeStatus,
} = require('../../../../middlewares/api/validators/umrah/package-types');

/**
 * @description get all umrah package types for customers
 * @param {string} path - /umrah/package-types/customers
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['getUmrahPackageTypes']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get('/customers', getUmrahPackageTypesCustomers);

/**
 * @description check if user is authorized
 * @param {string} path - /customers
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @method USE
 */
router.use(isAuthorized);

/**
 * @description get all umrah package types
 * @param {string} path - /umrah/package-types
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['getUmrahPackageTypes']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get('/', isAllowed(['admin']), getUmrahPackageTypes);

/**
 * @description get umrah package type
 * @param {string} path - /umrah/package-types/:id
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateUmrahPackageTypeId']
 * @param {function} controller - ['getUmrahPackageType']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get(
    '/:id',
    isAllowed(['admin']),
    validateUmrahPackageTypeId,
    getUmrahPackageType
);

/**
 * @description create umrah package type
 * @param {string} path - /umrah/package-types
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['createUmrahPackageType']
 * @returns {object} - router
 * @access private - ['admin']
 * @method POST
 */
router.post(
    '/',
    isAllowed(['admin']),
    validateUmrahPackageType,
    createUmrahPackageType
);

/**
 * @description update umrah package type
 * @param {string} path - /umrah/package-types/:id
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateUmrahPackageTypeId', 'validateUmrahPackageType']
 * @param {function} controller - ['updateUmrahPackageType']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PATCH
 */
router.patch(
    '/:id',
    isAllowed(['admin']),
    validateUmrahPackageTypeId,
    validateUmrahPackageType,
    updateUmrahPackageType
);

/**
 * @description - update umrah package type status
 * @param {string} path - /umrah/package-types/:id/status
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateUmrahPackageTypeId', 'validateUmrahPackageTypeStatus']
 * @param {function} controller - ['updateUmrahPackageTypeStatus']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PATCH
 */
router.patch(
    '/:id/status',
    isAuthorized,
    isAllowed(['admin']),
    validateUmrahPackageTypeId,
    validateUmrahPackageTypeStatus,
    updateUmrahPackageTypeStatus
);

/**
 * @description - delete many umrah package type by IDs
 * @param {string} path - '/umrah/package-types/delete-many'
 * @param {function} middleware - ['validateUmrahPackageTypeIds']
 * @param {function} controller - ['deleteManyUmrahPackageType']
 * @returns {object} - router
 * @access private ['admin']
 * @method DELETE
 */
router.delete(
    '/delete-many',
    isAuthorized,
    isAllowed(['admin']),
    validateUmrahPackageTypeIds,
    deleteManyUmrahPackageType
);

/**
 * @description delete umrah package type
 * @param {string} path - /umrah/package-types/:id
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateUmrahPackageTypeId']
 * @param {function} controller - ['deleteUmrahPackageType']
 * @returns {object} - router
 * @access private - ['admin']
 * @method DELETE
 */
router.delete(
    '/:id',
    isAllowed(['admin']),
    validateUmrahPackageTypeId,
    deleteUmrahPackageType
);

// export router
module.exports = router;
