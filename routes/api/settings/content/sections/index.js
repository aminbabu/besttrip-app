/**
 * @file /routes/api/settings/content/sections/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 03 Jul, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    getSections,
    getSection,
    updateOrCreateSection,
} = require('../../../../../controllers/api/settings/content/sections');

// middlewares
const {
    isAuthorized,
    isAllowed,
} = require('../../../../../middlewares/api/auth');
const {
    validateContentSectionKey,
    validateContentSection,
} = require('../../../../../middlewares/api/validators/settings/content/sections');

/**
 * @description - Get content section by key
 * @param {string} path - '/api/settings/content/sections/:key'
 * @param {function} validator - ['validateContentSectionKey']
 * @param {function} controller - ['getSection']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/:key', validateContentSectionKey, getSection);

/**
 * @description - Get all content sections
 * @param {string} path - '/api/settings/content/sections'
 * @param {function} controller - ['getSections']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/', getSections);

/**
 * @description - Update/Create content section
 * @param {string} path - '/api/settings/content/sections/:key'
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validators - ['validateContentSection']
 * @param {function} controller - ['updateOrCreateSection']
 * @returns {object} - router
 * @access private ['admin']
 * @method POST
 */
router.post(
    '/:key',
    isAuthorized,
    isAllowed(['admin']),
    validateContentSection,
    updateOrCreateSection
);

// export router
module.exports = router;
