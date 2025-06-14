/**
 * @file /routes/api/settings/content/exclusive-offers/index.js
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
    getExclusiveOffers,
    getExclusiveOffer,
    createExclusiveOffer,
    updateExclusiveOffer,
    updateExclusiveOfferStatus,
    deleteExclusiveOffer,
} = require('../../../../../controllers/api/settings/content/exclusive-offers');

// middlewares
const {
    isAuthorized,
    isAllowed,
} = require('../../../../../middlewares/api/auth');
const {
    validateExclusiveOfferId,
    validateExclusiveOffer,
    validateExclusiveOfferStatus,
    validateExclusiveOfferFile,
} = require('../../../../../middlewares/api/validators/settings/content/exclusive-offers');
const {
    uploadExclusiveOfferFile,
} = require('../../../../../middlewares/api/settings/content/exclusive-offers');

/**
 * @description - get exclusive offers
 * @param {string} path - '/api/settings/content/exclusive-offers'
 * @param {function} controller - ['getExclusiveOffer']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/', getExclusiveOffers);

/**
 * @description - get exclusive offer by id
 * @param {string} path - '/api/settings/content/exclusive-offers/:id'
 * @param {function} validator - ['getExclusiveOffer']
 * @param {function} controller - ['getExclusiveOffer']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/:id', validateExclusiveOfferId, getExclusiveOffer);

/**
 * @description - create exclusive offer
 * @param {string} path - '/api/settings/content/exclusive-offers'
 * @param {function} validator - ['validateExclusiveOfferFile', 'validateExclusiveOffer']
 * @param {function} middleware - ['uploadExclusiveOfferFile']
 * @param {function} controller - ['createExclusiveOffer']
 * @returns {object} - router
 * @access private ['admin']
 * @method POST
 */
router.post(
    '/',
    isAuthorized,
    isAllowed(['admin']),
    validateExclusiveOfferFile,
    validateExclusiveOffer,
    uploadExclusiveOfferFile('/offers/exclusive'),
    createExclusiveOffer
);

/**
 * @description - update exclusive offer
 * @param {string} path - '/api/settings/content/exclusive-offers/:id'
 * @param {function} validator - ['validateExclusiveOfferId', 'validateExclusiveOffer']
 * @param {function} middleware - ['uploadExclusiveOfferFile']
 * @param {function} controller - ['updateExclusiveOffer']
 * @returns {object} - router
 * @access private ['admin']
 * @method PATCH
 */
router.patch(
    '/:id',
    isAuthorized,
    isAllowed(['admin']),
    validateExclusiveOfferId,
    validateExclusiveOfferFile,
    validateExclusiveOffer,
    uploadExclusiveOfferFile('/offers/exclusive'),
    updateExclusiveOffer
);

/**
 * @description - update exclusive offer status
 * @param {string} path - '/api/settings/content/exclusive-offers/:id/status'
 * @param {function} validator - ['validateExclusiveOfferId', 'validateExclusiveOfferStatus']
 * @param {function} controller - ['updateExclusiveOfferStatus']
 * @returns {object} - router
 * @access private ['admin']
 * @method PATCH
 */
router.patch(
    '/:id/status',
    isAuthorized,
    isAllowed(['admin']),
    validateExclusiveOfferId,
    validateExclusiveOfferStatus,
    updateExclusiveOfferStatus
);

/**
 * @description - delete exclusive offer
 * @param {string} path - '/api/settings/content/exclusive-offers/:id'
 * @param {function} validator - ['validateExclusiveOfferId']
 * @param {function} controller - ['deleteExclusiveOffer']
 * @returns {object} - router
 * @access private ['admin']
 * @method DELETE
 */
router.delete(
    '/:id',
    isAuthorized,
    isAllowed(['admin']),
    validateExclusiveOfferId,
    deleteExclusiveOffer
);

// export router
module.exports = router;
