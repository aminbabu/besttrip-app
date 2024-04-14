/**
 * @file /routes/settings/site/contact/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 13 April, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

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

/**
 * @description get general settings
 * @param {string} path - '/settings/site/contact'
 * @param {function} controller - ['getContactSettings']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/', getContactSettings);

/**
 * @description create/update general settings
 * @param {string} path - '/settings/site/contact'
 * @param {function} middleware - ['isAuthorized', 'isAllowed', 'validateContactSettings']
 * @param {function} controller - ['updateContactSettings']
 * @returns {object} - router
 * @access private
 * @method PUT
 */
router.put('/', isAuthorized, isAllowed(['admin']), validateContactSettings, updateContactSettings);

// export router
module.exports = router;
