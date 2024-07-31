/**
 * @file /controllers/api/umrah/traveler/get-all-travelers.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 08 May, 2024
 */

const { Traveler } = require('./../../../../models');

// dependencies

// export get all traveler controller
module.exports = async (req, res, next) => {
    try {
        // create traveler
        const travelers = await Traveler.find({
            umrahBooking: req.params.umrahBookingId,
            createdBy: req.user._id,
        });

        // send traveler
        return res.status(200).send({
            message: 'Fetched all travelers successfully',
            travelers,
        });
    } catch (error) {
        return next(error);
    }
};
