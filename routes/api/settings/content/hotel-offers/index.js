/**
 * @file /routes/api/settings/content/hotel-offers/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 18 May, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    getHotelOffers,
    getHotelOffer,
    createHotelOffer,
    updateHotelOffer,
    deleteHotelOffer,
    updateHotelOfferStatus,
    deleteManyHotelOffers,
} = require('../../../../../controllers/api/settings/content/hotel-offers');

// middlewares
const {
    isAuthorized,
    isAllowed,
} = require('../../../../../middlewares/api/auth');
const {
    validateHotelOfferId,
    validateHotelOffer,
    validateHotelOfferFile,
    validateHotelOfferStatus,
    validateHotelOfferIds,
} = require('../../../../../middlewares/api/validators/settings/content/hotel-offers');
const {
    uploadHotelOfferFile,
} = require('../../../../../middlewares/api/settings/content/hotel-offers');

/**
 * @description - get hotel offers
 * @param {string} path - '/api/settings/content/hotel-offers'
 * @param {function} controller - ['getHotelOffer']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/', getHotelOffers);

/**
 * @description - get hotel offer by id
 * @param {string} path - '/api/settings/content/hotel-offers/:id'
 * @param {function} validator - ['getHotelOffer']
 * @param {function} controller - ['getHotelOffer']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/:id', validateHotelOfferId, getHotelOffer);

/**
 * @description - create hotel offer
 * @param {string} path - '/api/settings/content/hotel-offers'
 * @param {function} validator - ['validateHotelOfferFile', 'validateHotelOffer']
 * @param {function} middleware - ['uploadHotelOfferFile']
 * @param {function} controller - ['createHotelOffer']
 * @returns {object} - router
 * @access private ['admin']
 * @method POST
 */
router.post(
    '/',
    isAuthorized,
    isAllowed(['admin']),
    validateHotelOfferFile,
    validateHotelOffer,
    uploadHotelOfferFile('/offers/hotel'),
    createHotelOffer
);

/**
 * @description - update hotel offer
 * @param {string} path - '/api/settings/content/hotel-offers/:id'
 * @param {function} validator - ['validateHotelOfferId', 'validateHotelOffer']
 * @param {function} middleware - ['uploadHotelOfferFile']
 * @param {function} controller - ['updateHotelOffer']
 * @returns {object} - router
 * @access private ['admin']
 * @method PATCH
 */
router.patch(
    '/:id',
    isAuthorized,
    isAllowed(['admin']),
    validateHotelOfferId,
    validateHotelOfferFile,
    validateHotelOffer,
    uploadHotelOfferFile('/offers/hotel'),
    updateHotelOffer
);

/**
 * @description - update hotel offer status
 * @param {string} path - '/api/settings/content/hotel-offers/:id/status'
 * @param {function} validator - ['validateHotelOfferId', 'validateHotelOfferStatus']
 * @param {function} controller - ['updateHotelOfferStatus']
 * @returns {object} - router
 * @access private ['admin']
 * @method PATCH
 */
router.patch(
    '/:id/status',
    isAuthorized,
    isAllowed(['admin']),
    validateHotelOfferId,
    validateHotelOfferStatus,
    updateHotelOfferStatus
);

/**
 * @description - delete many hotel offers by IDs
 * @param {string} path - '/api/settings/content/hotel-offers/delete-many'
 * @param {function} middleware - ['validateHotelOfferIds']
 * @param {function} controller - ['deleteManyHotelOffers']
 * @returns {object} - router
 * @access private ['admin']
 * @method DELETE
 */
router.delete(
    '/delete-many',
    isAuthorized,
    isAllowed(['admin']),
    validateHotelOfferIds,
    deleteManyHotelOffers
);

/**
 * @description - delete hotel offer
 * @param {string} path - '/api/settings/content/hotel-offers/:id'
 * @param {function} validator - ['validateHotelOfferId']
 * @param {function} controller - ['deleteHotelOffer']
 * @returns {object} - router
 * @access private ['admin']
 * @method DELETE
 */
router.delete(
    '/:id',
    isAuthorized,
    isAllowed(['admin']),
    validateHotelOfferId,
    deleteHotelOffer
);

// export router
module.exports = router;
