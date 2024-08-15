/**
 * @file controllers/api/umrah/bookings/create-umrah-booking.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 31 July, 2024
 */

// dependencies
const {
    UMRAH_BOOKING_STATUS,
} = require('../../../../constants/umrah-bookings');
const { UmrahBooking } = require('../../../../models');
const moment = require('moment');

// export create umrah booking controller
module.exports = async (req, res, next) => {
    try {
        // Check if an Umrah booking with the same package and customer already exists
        const existingBooking = await UmrahBooking.findOne({
            customer: req.user._id,
            umrahPackage: req.body.umrahPackage,
            status: UMRAH_BOOKING_STATUS[0],
        });

        if (existingBooking) {
            return res.status(400).json({
                message: 'You have this Umrah package already in your list.',
            });
        }

        // Get the last booking reference ID count or default to 0
        const lastBooking = await UmrahBooking.findOne(
            {},
            {},
            { sort: { createdAt: -1 } }
        );
        const lastCount = lastBooking
            ? parseInt(lastBooking.bookingRefId.slice(11), 10)
            : 0;
        const count = (lastCount + 1).toString().padStart(4, '0');

        // Generate bookingRefId
        const bookingRefId = `BTU${moment().format('YYYYMMDD')}${count}`;

        const newUmrahBookingData = {
            customer: req.user._id,
            status: UMRAH_BOOKING_STATUS[0],
            bookingRefId,
            ...req.body,
        };

        // Conditionally include `partialPaymentExpiryDate` if it exists
        if (existingBooking?.partialPaymentExpiryDate) {
            newUmrahBookingData.partialPaymentExpiryDate =
                existingBooking.partialPaymentExpiryDate;
        }

        const newUmrahBooking = new UmrahBooking(newUmrahBookingData);

        // Save booking to database
        await newUmrahBooking.save();

        // Return success response
        return res.status(201).json({
            message: 'Umrah booking created successfully.',
            data: newUmrahBooking,
        });
    } catch (error) {
        return next(error);
    }
};
