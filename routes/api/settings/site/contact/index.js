/**
 * @file /routes/api/settings/site/contact/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 13 April, 2024
 * @update_date 18 May, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    getContactSettings,
    updateOrCreateContactSettings,
} = require('../../../../../controllers/api/settings/site/contact');

// middlewares
const { isAuthorized, isAllowed } = require('../../../../../middlewares/api/auth');
const {
    validateContactSettings,
} = require('../../../../../middlewares/api/validators/settings/site/contact');

/**
 * @description get contact settings
 * @param {string} path - '/settings/site/contact'
 * @param {function} controller - ['getContactSettings']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/', getContactSettings);

/**
 * @description update contact settings
 * @param {string} path - '/settings/site/contact'
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validateContactSettings']
 * @param {function} controller - ['updateContactSettings']
 * @returns {object} - router
 * @access private - ['admin']
 * @method POST
 */
router.post(
    '/',
    isAuthorized,
    isAllowed(['admin']),
    validateContactSettings,
    updateOrCreateContactSettings
);

// export router
module.exports = router;
