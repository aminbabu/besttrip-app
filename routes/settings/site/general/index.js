/**
 * @file /routes/settings/site/general/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 April, 2024
 * @update_date 07 April, 2024
 */

// dependencies
const express = require('express');

// controllers
const { getGeneralSettings, updateGeneralSettings } = require('../../../../controllers/settings');

// middlewares
const { isAuthorized, isAllowed } = require('../../../../middlewares/auth');
const { site } = require('../../../../middlewares/validators');

// express router
const router = express.Router();

/**
 * @description check if user is authorized
 * @param {string} path - '/settings/site/general'
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @access private
 * @method USE
 */
router.use(isAuthorized);

/**
 * @description get general site settings
 * @param {string} path - '/settings/site/general'
 * @param {function} middleware - ['site']
 * @param {function} controller - ['getGeneralSettings']
 * @returns {object} - router
 * @access private
 * @method GET
 */
router.get('/', isAllowed(['customer', 'admin']), getGeneralSettings);

/**
 * @description create/update general site settings
 * @param {string} path - '/settings/site/general'
 * @param {function} middleware - ['site']
 * @param {function} controller - ['updateGeneralSettings']
 * @returns {object} - router
 * @access private
 * @method PUT
 */
router.put('/', isAllowed(['admin']), site.general, updateGeneralSettings);

// export router
module.exports = router;
