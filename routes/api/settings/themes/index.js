/**
 * @file /routes/settings/themes/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 18 May, 2024
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
} = require('../../../../controllers/api/settings/themes');

// middlewares
const { isAuthorized, isAllowed } = require('../../../../middlewares/auth');
const {
    validateThemeSettingsKey,
    validateThemeSettings,
    validateThemeSettingsFile,
} = require('../../../../middlewares/validators/api/settings/themes');
const { uploadThemeSettingsFile } = require('../../../../middlewares/api/settings/themes');

/**
 * @description get themes
 * @param {string} path - '/settings/themes'
 * @param {function} controller - ['getThemes']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/', isAuthorized, isAllowed(['admin']), getThemes);

/**
 * @description get theme by key
 * @param {string} path - '/settings/themes/:key'
 * @param {function} validator - ['validateThemeSettingsKey']
 * @param {function} controller - ['getTheme']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/:theme', validateThemeSettingsKey, getTheme);

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
 * @method POST
 */
router.post(
    '/:theme',
    (req, res, next) => {
        console.log('req.body', req.body);
        next();
    },
    isAuthorized,
    isAllowed(['admin']),
    validateThemeSettingsKey,
    validateThemeSettingsFile,
    validateThemeSettings,
    uploadThemeSettingsFile('themes'),
    updateOrCreateTheme
);

// export router
module.exports = router;
