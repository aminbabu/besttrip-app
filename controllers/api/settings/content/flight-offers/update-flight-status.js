/**
 * @file /controllers/api/settings/content/flight-offers/get-flight-offers-status.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 Jul, 2024
 * @update_date 17 Jul, 2024
 */

// dependencies
const { FlightOffer } = require('../../../../../models');

// export update flight offer status controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;
        const { status } = req.body;

        // get flight offer
        const flightOffer = await FlightOffer.findById(id);

        // check if flight offer exists
        if (!flightOffer) {
            return res.status(200).send({
                message: 'Flight offer not found',
            });
        }

        // update flight offer
        flightOffer.set({ status });

        // save flight offer
        await flightOffer.save();

        // send response
        return res.status(200).send({
            message: 'Updated flight offer status successfully',
            flightOffer,
        });
    } catch (error) {
        return next(error);
    }
};
