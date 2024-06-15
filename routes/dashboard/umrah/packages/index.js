/**
 * @file routes/dashboard/umrah/packages/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    viewUmrahPackages,
    viewAddUmrahPackage,
    viewEditUmrahPackage,
} = require('../../../../controllers/dashboard/umrah/packages');

// middlewares
const { isAuthorized } = require('../../../../middlewares/dashboard/auth');

/**
 * @description check if user is authorized
 * @param {string} path - '/dashboard/payment-requests'
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @method USE
 */
router.use(isAuthorized);

/**
 * @description - umrah packages view route
 * @param {string} path - '/dashboard/umrah/packages'
 * @param {function} controller - ['viewUmrahPackages']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/packages', viewUmrahPackages);

/**
 * @description - umrah package add view route
 * @param {string} path - '/dashboard/umrah/package/add'
 * @param {function} controller - ['viewAddUmrahPackage']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/packages/add', viewAddUmrahPackage);

/**
 * @description - umrah package edit view route
 * @param {string} path - '/dashboard/umrah/package/edit/:id'
 * @param {function} controller - ['viewEditUmrahPackage']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/packages/:id', viewEditUmrahPackage);

// export router
module.exports = router;
