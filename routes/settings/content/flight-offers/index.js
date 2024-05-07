/**
 * @file /routes/settings/content/flight-offers/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 07 May, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    getFlightOffers,
    getFlightOffer,
    createFlightOffer,
    updateFlightOffer,
    deleteFlightOffer,
} = require('../../../../controllers/settings/content/flight-offers');

// middlewares
const { isAuthorized, isAllowed } = require('../../../../middlewares/auth');
const {
    validateFlightOfferId,
    validateFlightOffer,
    validateFlightOfferFile,
} = require('../../../../middlewares/validators/settings/content/flight-offers');
const { uploadFlightOfferFile } = require('../../../../middlewares/settings/content/flight-offers');

/**
 * @description - get flight offers
 * @param {string} path - '/settings/content/flight-offers'
 * @param {function} controller - ['getFlightOffer']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/', getFlightOffers);

/**
 * @description - get flight offer by id
 * @param {string} path - '/settings/content/flight-offers/:id'
 * @param {function} validator - ['getFlightOffer']
 * @param {function} controller - ['getFlightOffer']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/:id', validateFlightOfferId, getFlightOffer);

/**
 * @description - create flight offer
 * @param {string} path - '/settings/content/flight-offers'
 * @param {function} validator - ['validateFlightOfferFile', 'validateFlightOffer']
 * @param {function} middleware - ['uploadFlightOfferFile']
 * @param {function} controller - ['createFlightOffer']
 * @returns {object} - router
 * @access private ['admin']
 * @method POST
 */
router.post(
    '/',
    isAuthorized,
    isAllowed(['admin']),
    validateFlightOfferFile,
    validateFlightOffer,
    uploadFlightOfferFile('/offers/flight'),
    createFlightOffer
);

/**
 * @description - update flight offer
 * @param {string} path - '/settings/content/flight-offers/:id'
 * @param {function} validator - ['validateFlightOfferId', 'validateFlightOffer']
 * @param {function} middleware - ['uploadFlightOfferFile']
 * @param {function} controller - ['updateFlightOffer']
 * @returns {object} - router
 * @access private ['admin']
 * @method PUT
 */
router.put(
    '/:id',
    isAuthorized,
    isAllowed(['admin']),
    validateFlightOfferId,
    validateFlightOfferFile,
    validateFlightOffer,
    uploadFlightOfferFile('/offers/flight'),
    updateFlightOffer
);

/**
 * @description - delete flight offer
 * @param {string} path - '/settings/content/flight-offers/:id'
 * @param {function} validator - ['validateFlightOfferId']
 * @param {function} controller - ['deleteFlightOffer']
 * @returns {object} - router
 * @access private ['admin']
 * @method DELETE
 */
router.delete('/:id', isAuthorized, isAllowed(['admin']), validateFlightOfferId, deleteFlightOffer);

// export router
module.exports = router;
