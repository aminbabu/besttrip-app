/**
 * @file /routes/settings/site/meta/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 18 May, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    getMetaSettings,
    getMetaSetting,
    createMetaSetting,
    updateMetaSetting,
    deleteMetaSetting,
} = require('../../../../../controllers/api/settings/site/meta');

// middlewares
const { isAuthorized, isAllowed } = require('../../../../../middlewares/auth');
const {
    validateMetaSettingsId,
    validateMetaSettings,
} = require('../../../../../middlewares/validators/api/settings/site/meta');

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
 * @param {function} validator - ['validateMetaSettingsId']
 * @param {function} controller - ['getMetaSetting']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/:id', validateMetaSettingsId, getMetaSetting);

/**
 * @description create meta settings
 * @param {string} path - '/settings/site/meta'
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validateMetaSettings']
 * @param {function} controller - ['createMetaSetting']
 * @returns {object} - router
 * @access private - ['admin']
 * @method POST
 */
router.post('/', isAuthorized, isAllowed('admin'), validateMetaSettings, createMetaSetting);

/**
 * @description update meta settings
 * @param {string} path - '/settings/site/meta/:id'
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validateMetaSettingsId', 'validateMetaSettings']
 * @param {function} controller - ['updateMetaSetting']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PATCH
 */
router.patch(
    '/:id',
    isAuthorized,
    isAllowed('admin'),
    validateMetaSettingsId,
    validateMetaSettings,
    updateMetaSetting
);

/**
 * @description delete meta settings
 * @param {string} path - '/settings/site/meta/:id'
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validateMetaSettingsId']
 * @param {function} controller - ['deleteMetaSetting']
 * @returns {object} - router
 * @access private - ['admin']
 * @method DELETE
 */
router.delete('/:id', isAuthorized, isAllowed('admin'), validateMetaSettingsId, deleteMetaSetting);

// export router
module.exports = router;
