/**
 * @file /routes/settings/themes/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 08 May, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    getThemes,
    getTheme,
    updateOrCreateTheme,
} = require('../../../controllers/settings/themes');

// middlewares
const { isAuthorized, isAllowed } = require('../../../middlewares/auth');
const {
    validateThemeSettingsKey,
    validateThemeSettings,
    validateThemeSettingsFile,
} = require('../../../middlewares/validators/settings/themes');
const { uploadThemeSettingsFile } = require('../../../middlewares/settings/themes');

/**
 * @description get themes
 * @param {string} path - '/settings/themes'
 * @param {function} controller - ['getThemes']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/', getThemes);

/**
 * @description get theme by key
 * @param {string} path - '/settings/themes/:key'
 * @param {function} validator - ['validateThemeSettingsKey']
 * @param {function} controller - ['getTheme']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/:key', validateThemeSettingsKey, getTheme);

/**
 * @description update or create theme
 * @param {string} path - '/settings/themes/:key'
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validateThemeSettingsKey', 'validateThemeSettings']
 * @param {function} validator - ['validateThemeSettingsFile']
 * @param {function} middleware - ['uploadThemeSettingsFile']
 * @param {function} controller - ['updateOrCreateTheme']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PUT
 */
router.put(
    '/',
    isAuthorized,
    isAllowed(['admin']),
    validateThemeSettingsKey,
    validateThemeSettings,
    validateThemeSettingsFile,
    uploadThemeSettingsFile('themes'),
    updateOrCreateTheme
);

// export router
module.exports = router;
