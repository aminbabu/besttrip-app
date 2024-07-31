/**
 * @file routes/api/umrah/bookings/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 31 July, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    createUmrahBooking,
    viewUmrahBookings,
    getUmrahBookingByIdForAdmin,
    getUmrahBookingByIdForCustomer,
    updateUmrahBookingStatus,
    viewCustomerBookings,
    // submitBookingForReview,
    deleteUmrahBookingByIdForAdmin,
    deleteUmrahBookingByIdForCustomer,
    // deleteManyUmrahBookingsForAdmin,
    // deleteManyUmrahBookingsForCustomer,
} = require('../../../../controllers/api/umrah/bookings');

// middlewares
const { isAuthorized, isAllowed } = require('../../../../middlewares/api/auth');
const {
    validateUmrahBooking,
    validateUmrahBookingId,
    validateUmrahBookingIds,
    validateUmrahBookingStatus,
} = require('./../../../../middlewares/api/validators/umrah/bookings/index');

/**
 * @description check if user is authorized
 * @param {string} path - '/api/umrah/booking'
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @method USE
 */
router.use(isAuthorized);

/**
 * @description - view own umrah bookings (for customers)
 * @param {string} path - '/api/umrah/booking/my-bookings'
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['viewCustomerBookings']
 * @returns {object} - router
 * @access private - ['customer']
 * @method GET
 */
router.get('/my-bookings', isAllowed(['customer']), viewCustomerBookings);

/**
 * @description - umrah bookings view route
 * @param {string} path - '/api/umrah/booking/:status'
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['viewUmrahBookings']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get('/:status', isAllowed(['admin']), viewUmrahBookings);

/**
 * @description - create new umrah booking
 * @param {string} path - '/api/umrah/booking'
 * @param {function} middleware - ['isAllowed', 'validateUmrahBooking']
 * @param {function} controller - ['createUmrahBooking']
 * @returns {object} - router
 * @access private - ['customer']
 * @method POST
 */
router.post(
    '/',
    isAllowed(['customer']),
    validateUmrahBooking,
    createUmrahBooking
);

/**
 * @description - get umrah booking by id for admin
 * @param {string} path - '/api/umrah/booking/admin/:id'
 * @param {function} middleware - ['isAllowed', 'validateUmrahBookingId']
 * @param {function} controller - ['getUmrahBookingByIdForAdmin']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get(
    '/admin/:id',
    isAllowed(['admin']),
    validateUmrahBookingId,
    getUmrahBookingByIdForAdmin
);

/**
 * @description - get umrah booking by id for customer
 * @param {string} path - '/api/umrah/booking/customer/:id'
 * @param {function} middleware - ['isAllowed', 'validateUmrahBookingId']
 * @param {function} controller - ['getUmrahBookingByIdForCustomer']
 * @returns {object} - router
 * @access private - ['customer']
 * @method GET
 */
router.get(
    '/customer/:id',
    isAllowed(['customer']),
    validateUmrahBookingId,
    getUmrahBookingByIdForCustomer
);

/**
 * @description - submit booking for review
 * @param {string} path - '/api/umrah/booking/:id/submit-review'
 * @param {function} middleware - ['isAllowed', 'validateUmrahBookingId']
 * @param {function} controller - ['submitBookingForReview']
 * @returns {object} - router
 * @access private - ['customer']
 * @method POST
 */
// router.post('/:id/submit-review',isAllowed(['customer']),validateUmrahBookingId,submitBookingForReview);

/**
 * @description - update umrah booking status
 * @param {string} path - '/api/umrah/booking/:id/status'
 * @param {function} middleware - ['isAllowed', 'validateUmrahBookingId']
 * @param {function} controller - ['updateUmrahBookingStatus']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PATCH
 */
router.patch(
    '/:id/status',
    isAllowed(['admin']),
    validateUmrahBookingId,
    updateUmrahBookingStatus,
    updateUmrahBookingStatus
);

/**
 * @description - delete umrah booking by id for admin
 * @param {string} path - '/api/umrah/booking/admin/:id'
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['deleteUmrahBookingByIdForAdmin']
 * @returns {object} - router
 * @access private - ['admin']
 * @method DELETE
 */
router.delete(
    '/admin/:id',
    isAllowed(['admin']),
    validateUmrahBookingId,
    deleteUmrahBookingByIdForAdmin
);

/**
 * @description - delete umrah booking by id for customer
 * @param {string} path - '/api/umrah/booking/customer/:id'
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['deleteUmrahBookingByIdForCustomer']
 * @returns {object} - router
 * @access private - ['customer']
 * @method DELETE
 */
router.delete(
    '/customer/:id',
    isAllowed(['customer']),
    validateUmrahBookingId,
    deleteUmrahBookingByIdForCustomer
);

/**
 * @description - delete multiple umrah bookings by IDs for admin
 * @param {string} path - '/api/umrah/booking/admin/delete-many'
 * @param {function} middleware - ['isAllowed', 'validateUmrahBookingIds']
 * @param {function} controller - ['deleteManyUmrahBookingsForAdmin']
 * @returns {object} - router
 * @access private - ['admin']
 * @method DELETE
 */
// router.delete(
//     '/admin/delete-many',
//     isAllowed(['admin']),
//     validateUmrahBookingIds,
//     deleteManyUmrahBookingsForAdmin
// );

/**
 * @description - delete multiple umrah bookings by IDs for customer
 * @param {string} path - '/api/umrah/booking/customer/delete-many'
 * @param {function} middleware - ['isAllowed', 'validateUmrahBookingIds']
 * @param {function} controller - ['deleteManyUmrahBookingsForCustomer']
 * @returns {object} - router
 * @access private - ['customer']
 * @method DELETE
 */
// router.delete(
//     '/customer/delete-many',
//     isAllowed(['customer']),
//     validateUmrahBookingIds,
//     deleteManyUmrahBookingsForCustomer
// );

// export router
module.exports = router;
