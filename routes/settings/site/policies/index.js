/**
 * @file /routes/settings/site/policies/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    getAboutUs,
    getTermsOfConditions,
    getReturnPolicy,
    getPrivacyPolicy,
    updatePolicies,
} = require('../../../../controllers/settings/site/policies');

// middlewares
const { isAuthorized, isAllowed } = require('../../../../middlewares/auth');
const {
    validatePoliciesSettings,
} = require('../../../../middlewares/validators/settings/site/policies');

/**
 * @description get about us settings
 * @param {string} path - '/settings/site/policies/about-us'
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} controller - ['getAboutUs']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/about-us', getAboutUs);

/**
 * @description get terms of conditions settings
 * @param {string} path - '/settings/site/policies/terms-of-conditions'
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} controller - ['getTermsOfConditions']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/terms-of-conditions', getTermsOfConditions);

/**
 * @description get return policy settings
 * @param {string} path - '/settings/site/policies/return-policy'
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} controller - ['getReturnPolicy']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/return-policy', getReturnPolicy);

/**
 * @description get privacy policy settings
 * @param {string} path - '/settings/site/policies/privacy-policy'
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} controller - ['getPrivacyPolicy']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/privacy-policy', getPrivacyPolicy);

/**
 * @description create/update policies settings
 * @param {string} path - '/settings/site/policies'
 * @param {function} middleware - ['isAuthorized', 'isAllowed', 'validatePoliciesSettings']
 * @param {function} controller - ['updatePolicies']
 * @returns {object} - router
 * @access private
 * @method PUT
 */
router.put(
    '/settings/site/policies',
    isAuthorized,
    isAllowed(['admin']),
    validatePoliciesSettings,
    updatePolicies
);

// export router
module.exports = router;
