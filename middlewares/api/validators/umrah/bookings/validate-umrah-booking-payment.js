/**
 * @file /middlewares/api/validators/umrah/bookings/validate-umrah-booking-payment-type
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 28 April, 2024
 */

// dependencies

const {
    umrahBookingSchema,
} = require('../../../../../schemas/zod/umrah/bookings');
const { zodErrorHandler } = require('../../../../../handlers/errors');
const {
    UMRAH_BOOKING_PAYMENT_TYPE,
} = require('../../../../../constants/umrah-bookings');

// export umrah booking payment type validator
module.exports = (req, res, next) => {
    // Retrieve paymentType and partialPaymentAmount from the validated data
    const { paymentType } = req.body;

    // validate request body
    const { error, success } = umrahBookingSchema
        .pick({ paymentType: true })
        .safeParse(req.body);

    // check for errors
    if (!success) {
        // return error response
        return zodErrorHandler(res, error);
    }

    // proceed to next middleware
    return next();
};
