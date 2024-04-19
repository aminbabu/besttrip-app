/**
 * @file /routes/settings/content/exclusive-offers/index.js
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
    getExclusiveOffers,
    getExclusiveOffersById,
    createExclusiveOffer,
    updateExclusiveOffer,
    deleteExclusiveOffer,
} = require('../../../../controllers/settings/content/exclusive-offers');

// middlewares
const { isAuthorized, isAllowed } = require('../../../../middlewares/auth');
const {
    validateExclusiveOfferId,
    validateExclusiveOffer,
    validateExclusiveOfferFile,
} = require('../../../../middlewares/validators/settings/content/exclusive-offers');
const {
    uploadExclusiveOffersFile,
} = require('../../../../middlewares/settings/content/exclusive-offers');

/**
 * @description - get exclusive offers
 * @param {string} path - '/settings/content/exclusive'
 * @param {function} controller - ['getExclusiveOffers']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/', getExclusiveOffers);

/**
 * @description - get exclusive offer by id
 * @param {string} path - '/settings/content/exclusive/:id'
 * @param {function} validator - ['getExclusiveOffersById']
 * @param {function} controller - ['getExclusiveOffersById']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/:id', validateExclusiveOfferId, getExclusiveOffersById);

/**
 * @description - create exclusive offer
 * @param {string} path - '/settings/content/exclusive'
 * @param {function} validator - ['validateExclusiveOfferFile', 'validateExclusiveOffer']
 * @param {function} middleware - ['uploadExclusiveOffersFile']
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
    uploadExclusiveOffersFile('/offers'),
    createExclusiveOffer
);

/**
 * @description - update exclusive offer
 * @param {string} path - '/settings/content/exclusive/:id'
 * @param {function} validator - ['validateExclusiveOfferId', 'validateExclusiveOffer']
 * @param {function} middleware - ['uploadExclusiveOffersFile']
 * @param {function} controller - ['updateExclusiveOffer']
 * @returns {object} - router
 * @access private ['admin']
 * @method PUT
 */
router.put(
    '/:id',
    isAuthorized,
    isAllowed(['admin']),
    validateExclusiveOfferId,
    validateExclusiveOffer,
    uploadExclusiveOffersFile('/offers'),
    updateExclusiveOffer
);

/**
 * @description - delete exclusive offer
 * @param {string} path - '/settings/content/exclusive/:id'
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
