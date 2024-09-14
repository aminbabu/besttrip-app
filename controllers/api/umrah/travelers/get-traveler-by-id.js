/**
 * @file /controllers/api/umrah/traveler/get-traveler.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 08 May, 2024
 */

const { default: mongoose } = require('mongoose');
const {
    UMRAH_BOOKING_STATUS,
} = require('../../../../constants/umrah-bookings');
const { Traveler, UmrahBooking } = require('../../../../models');

// export get single traveler controller
module.exports = async (req, res, next) => {
    try {
        const query = {
            _id: new mongoose.Types.ObjectId(req.params.travelerId),
            umrahBooking: new mongoose.Types.ObjectId(
                req.params.umrahBookingId
            ),
        };
        // console.log(query);
        // Add customer filter if the user is not an admin
        if (req.user.role !== 'admin') {
            query.createdBy = new mongoose.Types.ObjectId(req.user._id);
        }
        console.log(query);
        const traveler = await Traveler.findOne(query);

        if (!traveler) {
            return res.status(404).send({
                message: 'Traveler not found',
            });
        }

        // send traveler
        return res.status(200).send({
            message: 'Traveler data fetched successfully',
            traveler,
        });
    } catch (error) {
        return next(error);
    }
};
