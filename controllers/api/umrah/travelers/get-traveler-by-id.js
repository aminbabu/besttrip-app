/**
 * @file /controllers/api/umrah/traveler/get-traveler.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 08 May, 2024
 */

const {
    UMRAH_BOOKING_STATUS,
} = require('../../../../constants/umrah-bookings');
const { Traveler, UmrahBooking } = require('../../../../models');

// dependencies

// export get single traveler controller
module.exports = async (req, res, next) => {
    try {
        const traveler = await Traveler.findOne({
            createdBy: req.user._id,
            _id: req.params.travelerId,
            umrahBooking: req.params.umrahBookingId,
        });

        // send traveler
        return res.status(201).send({
            message: 'Traveler data fetched successfully',
            traveler,
        });
    } catch (error) {
        return next(error);
    }
};
