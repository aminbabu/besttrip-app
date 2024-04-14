/**
 * @file /routes/settings/site/contact/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 13 April, 2024
 * @update_date 13 April, 2024
 */

// dependencies
const express = require('express');

// controllers
const {
    getContactSettings,
    updateContactSettings,
} = require('../../../../controllers/settings/site/contact');

// middlewares
const { isAuthorized, isAllowed } = require('../../../../middlewares/auth');
const {
    validateContactSettings,
} = require('../../../../middlewares/validators/settings/site/contact');

// express router
// express router
const router = express.Router();

/**
 * @description get general settings
 * @param {string} path - '/settings/site/contact'
 * @param {function} middleware - ['site']
 * @param {function} controller - ['getContactSettings']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/', getContactSettings);

/**
 * @description create/update general settings
 * @param {string} path - '/settings/site/contact'
 * @param {function} middleware - ['site']
 * @param {function} controller - ['updateContactSettings']
 * @returns {object} - router
 * @access private
 * @method PUT
 */
router.put('/', isAuthorized, isAllowed(['admin']), validateContactSettings, updateContactSettings);

// export router
module.exports = router;
