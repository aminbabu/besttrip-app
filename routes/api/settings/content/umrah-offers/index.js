/**
 * @file /routes/api/settings/content/umrah-offers/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 18 May, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    getUmrahOffers,
    getUmrahOffer,
    createUmrahOffer,
    updateUmrahOffer,
    deleteUmrahOffer,
    deleteManyUmrahOffers,
    updateUmrahOfferStatus,
} = require('../../../../../controllers/api/settings/content/umrah-offers');

// middlewares
const {
    isAuthorized,
    isAllowed,
} = require('../../../../../middlewares/api/auth');
const {
    validateUmrahOfferIds,
    validateUmrahOfferId,
    validateUmrahOffer,
    validateUmrahOfferStatus,
    validateUmrahOfferFile,
} = require('../../../../../middlewares/api/validators/settings/content/umrah-offers');
const {
    uploadUmrahOfferFile,
} = require('../../../../../middlewares/api/settings/content/umrah-offers');

/**
 * @description - get umrah offers
 * @param {string} path - '/api/settings/content/umrah-offers'
 * @param {function} controller - ['getUmrahOffer']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/', getUmrahOffers);

/**
 * @description - get umrah offer by id
 * @param {string} path - '/api/settings/content/umrah-offers/:id'
 * @param {function} validator - ['getUmrahOffer']
 * @param {function} controller - ['getUmrahOffer']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/:id', validateUmrahOfferId, getUmrahOffer);

/**
 * @description - create umrah offer
 * @param {string} path - '/api/settings/content/umrah-offers'
 * @param {function} validator - ['validateUmrahOfferFile', 'validateUmrahOffer']
 * @param {function} middleware - ['uploadUmrahOfferFile']
 * @param {function} controller - ['createUmrahOffer']
 * @returns {object} - router
 * @access private ['admin']
 * @method POST
 */
router.post(
    '/',
    isAuthorized,
    isAllowed(['admin']),
    validateUmrahOfferFile,
    validateUmrahOffer,
    uploadUmrahOfferFile('/offers/umrah'),
    createUmrahOffer
);

/**
 * @description - update umrah offer
 * @param {string} path - '/api/settings/content/umrah-offers/:id
 * @param {function} validator - ['validateUmrahOfferId', 'validateUmrahOffer']
 * @param {function} middleware - ['uploadUmrahOfferFile']
 * @param {function} controller - ['updateUmrahOffer']
 * @returns {object} - router
 * @access private ['admin']
 * @method PATCH
 */
router.patch(
    '/:id',
    isAuthorized,
    isAllowed(['admin']),
    validateUmrahOfferId,
    validateUmrahOfferFile,
    validateUmrahOffer,
    uploadUmrahOfferFile('/offers/umrah'),
    updateUmrahOffer
);

/**
 * @description - update umrah offer status
 * @param {string} path - '/api/settings/content/umrah-offers/:id/status'
 * @param {function} validator - ['validateUmrahOfferId', 'validateUmrahOfferStatus']
 * @param {function} controller - ['updateUmrahOfferStatus']
 * @returns {object} - router
 * @access private ['admin']
 * @method PATCH
 */
router.patch(
    '/:id/status',
    isAuthorized,
    isAllowed(['admin']),
    validateUmrahOfferId,
    validateUmrahOfferStatus,
    updateUmrahOfferStatus
);

/**
 * @description - delete many umrah offers by IDs
 * @param {string} path - '/api/settings/content/umrah-offers/delete-many'
 * @param {function} middleware - ['validateUmrahOfferIds']
 * @param {function} controller - ['deleteManyUmrahOffers']
 * @returns {object} - router
 * @access private ['admin']
 * @method DELETE
 */
router.delete(
    '/delete-many',
    isAuthorized,
    isAllowed(['admin']),
    validateUmrahOfferIds,
    deleteManyUmrahOffers
);

/**
 * @description - delete umrah offer
 * @param {string} path - '/api/settings/content/umrah-offers/:id'
 * @param {function} validator - ['validateUmrahOfferId']
 * @param {function} controller - ['deleteUmrahOffer']
 * @returns {object} - router
 * @access private ['admin']
 * @method DELETE
 */
router.delete(
    '/:id',
    isAuthorized,
    isAllowed(['admin']),
    validateUmrahOfferId,
    deleteUmrahOffer
);

// export router
module.exports = router;
