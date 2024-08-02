/**
 * @file /controllers/api/settings/content/flight-offers/get-flight-offers.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { FlightOffer } = require('../../../../../models');

// export get flight offers controller
module.exports = async (req, res, next) => {
    try {
        // get flight offers
        const flightOffers = await FlightOffer.find();

        // send response
        return res.status(200).send({
            message: 'Fetched flight offers successfully',
            flightOffers,
        });
    } catch (error) {
        return next(error);
    }
};
