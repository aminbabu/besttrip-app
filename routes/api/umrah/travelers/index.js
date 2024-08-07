/**
 * @file routes/api/travelers/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 31 July, 2024
 * @update_date 31 July, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    getAllTravelers,
    getTravelerById,
    createTraveler,
    updateTraveler,
    deleteTravelerById,
    // deleteManyTravelers,
} = require('../../../../controllers/api/umrah/travelers');

// middlewares
const { isAuthorized, isAllowed } = require('../../../../middlewares/api/auth');
const {
    validateTraveler,
    validateUmrahBookingId,
    validateTravelerId,
    validateTravelerPhoto,
    validateTravelerPassport,
    validateTravelerNID,
    validateTravelerUpdate,
    validateTravelerCovidCertificate,
} = require('../../../../middlewares/api/validators/umrah/travelers');
const {
    uploadTravelerPhoto,
    uploadTravelerPassport,
    uploadTravelerNID,
    uploadTravelerCovidCertificate,
} = require('../../../../middlewares/api/umrah/travelers');

/**
 * @description check if user is authorized
 * @param {string} path - '/api/umrah/travelers'
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @method USE
 */
router.use(isAuthorized);

/**
 * @description - get all travelers
 * @param {string} path - '/api/umrah/travelers/:umrahBookingId'
 * @param {function} controller - ['isAllowed', getAllTravelers']
 * @returns {object} - router
 * @access private - ['customer']
 * @method GET
 */
router.get(
    '/:umrahBookingId',
    isAllowed(['customer']),
    validateUmrahBookingId,
    getAllTravelers
);

/**
 * @description - get traveler by umrahBookingId and traveler ID
 * @param {string} path - '/api/umrah/travelers/:umrahBookingId/:travelerId'
 * @param {function} middleware - ['isAllowed', 'validateUmrahBookingId', 'validateTravelerId']
 * @param {function} controller - ['getTravelerById']
 * @returns {object} - router
 * @access private - ['customer', 'admin']
 * @method GET
 */
router.get(
    '/:umrahBookingId/:travelerId',
    isAllowed(['customer', 'admin']),
    validateTravelerId,
    validateUmrahBookingId,
    getTravelerById
);

/**
 * @description - create new traveler
 * @param {string} path - '/api/umrah/travelers'
 * @param {function} middleware - [isAllowed 'validateTraveler']
 * @param {function} controller - ['createTraveler']
 * @returns {object} - router
 * @access private - ['customer','admin]
 * @method POST
 */
router.post(
    '/',
    isAllowed(['customer', 'admin']),
    validateTraveler,
    validateTravelerPhoto,
    validateTravelerPassport,
    validateTravelerNID,
    validateTravelerCovidCertificate,
    uploadTravelerPhoto('/umrah/traveler'),
    uploadTravelerPassport('/umrah/traveler'),
    uploadTravelerNID('/umrah/traveler'),
    uploadTravelerCovidCertificate('/umrah/traveler'),
    createTraveler
);

/**
 * @description - update traveler by ID
 * @param {string} path - '/api/umrah/travelers/:umrahBookingId/:travelerId'
 * @param {function} middleware - [isAllowed 'validateTravelerId', validateTravelerId, 'validateTraveler']
 * @param {function} controller - ['updateTraveler']
 * @returns {object} - router
 * @access private - ['customer','admin']
 * @method PATCH
 */
router.patch(
    '/:umrahBookingId/:travelerId',
    isAllowed(['customer', 'admin']),
    validateTravelerId,
    validateUmrahBookingId,
    validateTravelerUpdate,
    validateTravelerPhoto,
    validateTravelerPassport,
    validateTravelerNID,
    validateTravelerCovidCertificate,
    uploadTravelerPhoto('/umrah/traveler'),
    uploadTravelerPassport('/umrah/traveler'),
    uploadTravelerNID('/umrah/traveler'),
    uploadTravelerCovidCertificate('/umrah/traveler'),
    updateTraveler
);

/**
 * @description - delete traveler by ID
 * @param {string} path - '/api/umrah/travelers/:umrahBookingId/:travelerId'
 * @param {function} middleware - [isAllowed, 'validateUmrahBookingId', 'validateTravelerId']
 * @param {function} controller - ['deleteTravelerById']
 * @returns {object} - router
 * @access private - ['customer','admin']
 * @method DELETE
 */
router.delete(
    '/:umrahBookingId/:travelerId',
    isAllowed(['customer', 'admin']),
    validateTravelerId,
    validateUmrahBookingId,
    deleteTravelerById
);

/**
 * @description - delete multiple travelers by IDs
 * @param {string} path - '/api/umrah/travelers/delete-many'
 * @param {function} middleware - [allowed 'validateTravelerIds']
 * @param {function} controller - ['deleteManyTravelers']
 * @returns {object} - router
 * @access private - ['customer']
 * @method DELETE
 */
// router.delete('/delete-many',isAllowed(['customer']),validateTravelerIds, deleteManyTravelers);

// export router
module.exports = router;
