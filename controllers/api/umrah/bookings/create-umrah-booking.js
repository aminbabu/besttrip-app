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

// export create umrah booking controller
module.exports = async (req, res, next) => {
    try {
        // Check if an Umrah booking with the same package and customer already exists
        const existingBooking = await UmrahBooking.findOne({
            customer: req.user._id,
            umrahPackage: req.body.umrahPackage,
            status: { $eq: UMRAH_BOOKING_STATUS[0] },
        });

        if (existingBooking) {
            return res.status(400).json({
                success: false,
                message: 'You have this Umrah package already in your list.',
            });
        }

        // create new umrah booking
        const newUmrahBooking = new UmrahBooking({
            customer: req.user._id,
            status: UMRAH_BOOKING_STATUS[0],
            ...req.body,
        });

        // save booking to database
        await newUmrahBooking.save();

        // return success response
        return res.status(201).json({
            success: true,
            message: 'Umrah booking created successfully.',
            data: newUmrahBooking,
        });
    } catch (error) {
        return next(error);
    }
};
