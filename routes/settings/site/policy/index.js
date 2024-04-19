/**
 * @file /routes/settings/site/policy/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
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
 * @description get policy settings
 * @param {string} path - '/settings/site/policy/'
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validatePolicySettingsKey']
 * @param {function} controller - ['getPolicy']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/', validatePolicySettingsKey, getPolicy);

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
 * @param {string} path - '/settings/site/policy'
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validatePolicySettings']
 * @param {function} controller - ['updatePolicy']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PATCH
 */
router.patch('/', isAuthorized, isAllowed(['admin']), validatePolicySettings, updatePolicy);

// export router
module.exports = router;
