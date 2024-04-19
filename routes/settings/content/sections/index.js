/**
 * @file /routes/settings/content/sections/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    getSections,
    updateOrCreateSection,
} = require('../../../../controllers/settings/content/sections');

// middlewares
const { isAuthorized, isAllowed } = require('../../../../middlewares/auth');
const {
    validateContentSectionId,
    validateContentSection,
} = require('../../../../middlewares/validators/settings/content/sections');

/**
 * @description - Get all content sections
 * @param {string} path - '/settings/content/sections'
 * @param {function} controller - ['getSections']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/', getSections);

/**
 * @description - Update/Create content section
 * @param {string} path - '/settings/content/sections/:id'
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validators - ['validateContentSectionId', 'validateContentSection']
 * @param {function} controller - ['updateOrCreateSection']
 * @returns {object} - router
 * @access private
 * @method PUT
 */
router.put(
    '/:id',
    isAuthorized,
    isAllowed(['admin']),
    validateContentSectionId,
    validateContentSection,
    updateOrCreateSection
);

// export router
module.exports = router;
