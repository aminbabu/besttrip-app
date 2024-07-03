/**
 * @file /routes/api/settings/site/policy/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 03 Jul, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    getPolicies,
    updateOrCreagtePolicy,
} = require('../../../../../controllers/api/settings/site/policy');

// middlewares
const {
    isAuthorized,
    isAllowed,
} = require('../../../../../middlewares/api/auth');
const {
    validatePolicySettings,
} = require('../../../../../middlewares/api/validators/settings/site/policy');
const {
    uploadPolicySettingsFile,
} = require('../../../../../middlewares/api/settings/site/policy');

/**
 * @description get policies settings
 * @param {string} path - '/api/settings/site/policy'
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} controller - ['getPolicies']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/', getPolicies);

/**
 * @description create policy settings
 * @param {string} path - '/api/settings/site/policy'
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validatePolicySettings']
 * @param {function} controller - ['updateOrCreagtePolicy']
 * @returns {object} - router
 * @access private - ['admin']
 * @method POST
 */
router.post(
    '/',
    isAuthorized,
    isAllowed(['admin']),
    validatePolicySettings,
    updateOrCreagtePolicy
);

/**
 * @description upload policy settings media
 * @param {string} path - '/api/settings/site/policy/media'
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validatePolicySettingsMedia']
 * @param {function} controller - ['uploadPolicySettingsFile']
 * @returns {object} - router
 * @access private - ['admin']
 * @method POST
 */
router.post(
    '/media',
    isAuthorized,
    isAllowed(['admin']),
    uploadPolicySettingsFile
);

// export router
module.exports = router;
