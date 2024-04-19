/**
 * @file /controllers/settings/content/flight-offer/create-flight-offer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { FlightOffer } = require('../../../../models');

// export create flight offer controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { link, status } = req.body;

        // create flight offer
        const flightOffer = await FlightOffer.create({
            link,
            status,
        });

        // send response
        return res.status(201).send({
            message: 'Created flight offer successfully',
            flightOffer,
        });
    } catch (error) {
        return next(error);
    }
};
