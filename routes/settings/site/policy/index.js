/**
 * @file /routes/settings/site/policy/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 18 May, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    getPolicies,
    getPolicy,
    createPolicy,
    updatePolicy,
} = require('../../../../controllers/settings/site/policy');

// middlewares
const { isAuthorized, isAllowed } = require('../../../../middlewares/auth');
const {
    validatePolicySettingsKey,
    validatePolicySettings,
} = require('../../../../middlewares/validators/settings/site/policy');

/**
 * @description get policies settings
 * @param {string} path - '/settings/site/policy'
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} controller - ['getPolicies']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/', getPolicies);

/**
 * @description get policy settings
 * @param {string} path - '/settings/site/policy/:key'
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validatePolicySettingsKey']
 * @param {function} controller - ['getPolicy']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/:key', validatePolicySettingsKey, getPolicy);

/**
 * @description create policy settings
 * @param {string} path - '/settings/site/policy'
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validatePolicySettings']
 * @param {function} controller - ['createPolicy']
 * @returns {object} - router
 * @access private - ['admin']
 * @method POST
 */
router.post('/', isAuthorized, isAllowed(['admin']), validatePolicySettings, createPolicy);

/**
 * @description update policy settings
 * @param {string} path - '/settings/site/policy/:key'
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validatePolicySettingsKey', 'validatePolicySettings']
 * @param {function} controller - ['updatePolicy']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PATCH
 */
router.patch(
    '/:key',
    isAuthorized,
    isAllowed(['admin']),
    validatePolicySettingsKey,
    validatePolicySettings,
    updatePolicy
);

// export router
module.exports = router;
