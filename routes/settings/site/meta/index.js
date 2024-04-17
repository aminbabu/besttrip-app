/**
 * @file /routes/settings/site/meta/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 17 April, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    getMetaSettings,
    getMetaSettingsById,
    createMetaSettings,
    updateMetaSettings,
    deleteMetaSettings,
} = require('../../../../controllers/settings/site/meta');

// middlewares
const { isAuthorized, isAllowed } = require('../../../../middlewares/auth');
const {
    validateMetaSettingsId,
    validateMetaSettings,
} = require('../../../../middlewares/validators/settings/site/meta');

/**
 * @description get meta settings
 * @param {string} path - '/settings/site/meta'
 * @param {function} controller - ['getMetaSettings']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/', getMetaSettings);

/**
 * @description get meta settings by id
 * @param {string} path - '/settings/site/meta/:id'
 * @param {function} middleware - ['validateMetaSettingsId']
 * @param {function} controller - ['getMetaSettingsById']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/:id', validateMetaSettingsId, getMetaSettingsById);

/**
 * @description create meta settings
 * @param {string} path - '/settings/site/meta'
 * @param {function} middleware - ['isAuthorized', 'isAllowed', 'validateMetaSettings']
 * @param {function} controller - ['createMetaSettings']
 * @returns {object} - router
 * @access private - ['admin']
 * @method POST
 */
router.post('/', isAuthorized, isAllowed('admin'), validateMetaSettings, createMetaSettings);

/**
 * @description update meta settings
 * @param {string} path - '/settings/site/meta/:id'
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} middleware - ['validateMetaSettingsId', 'validateMetaSettings']
 * @param {function} controller - ['updateMetaSettings']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PATCH
 */
router.patch('/:id', isAuthorized, isAllowed('admin'), validateMetaSettings, updateMetaSettings);

/**
 * @description delete meta settings
 * @param {string} path - '/settings/site/meta/:id'
 * @param {function} middleware - ['isAuthorized', 'isAllowed', 'validateMetaSettingsId']
 * @param {function} controller - ['deleteMetaSettings']
 * @returns {object} - router
 * @access private - ['admin']
 * @method DELETE
 */
router.delete('/:id', isAuthorized, isAllowed('admin'), validateMetaSettingsId, deleteMetaSettings);

// export router
module.exports = router;
