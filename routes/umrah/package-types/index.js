/**
 * @file /routes/umrah/package-types/index.js
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
    getUmrahPackageTypes,
    getUmrahPackageType,
    createUmrahPackageType,
    updateUmrahPackageType,
    deleteUmrahPackageType,
} = require('../../../controllers/api/umrah/package-types');

// middlewares
const { isAuthorized, isAllowed } = require('../../../middlewares/api/auth');
const {
    validateUmrahPackageTypeId,
    validateUmrahPackageType,
} = require('../../../middlewares/validators/api/umrah/package-types');

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
router.get('/:id', isAllowed(['admin']), validateUmrahPackageTypeId, getUmrahPackageType);

/**
 * @description create umrah package type
 * @param {string} path - /umrah/package-types
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['createUmrahPackageType']
 * @returns {object} - router
 * @access private - ['admin']
 * @method POST
 */
router.post('/', isAllowed(['admin']), validateUmrahPackageType, createUmrahPackageType);

/**
 * @description update umrah package type
 * @param {string} path - /umrah/package-types/:id
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateUmrahPackageTypeId', 'validateUmrahPackageType']
 * @param {function} controller - ['updateUmrahPackageType']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PUT
 */
router.put(
    '/:id',
    isAllowed(['admin']),
    validateUmrahPackageTypeId,
    validateUmrahPackageType,
    updateUmrahPackageType
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
router.delete('/:id', isAllowed(['admin']), validateUmrahPackageTypeId, deleteUmrahPackageType);

// export router
module.exports = router;
