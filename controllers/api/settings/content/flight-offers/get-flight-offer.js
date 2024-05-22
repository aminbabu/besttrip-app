/**
 * @file /controllers/api/settings/content/flight-offers/delete-flight-offer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 07 May, 2024
 */

// dependencies
const { FlightOffer } = require('../../../../../models');

// export get flight offers by id controller
module.exports = async (req, res, next) => {
    try {
        const { id } = req.params;

        // get flight offers
        const flightOffer = await FlightOffer.findById(id);

        // check if flight offer exists
        if (!flightOffer) {
            return res.status(404).send({
                message: 'Flight offer not found',
            });
        }

        // send response
        return res.send({
            message: 'Fetched flight offer successfully',
            flightOffer,
        });
    } catch (error) {
        return next(error);
    }
};
