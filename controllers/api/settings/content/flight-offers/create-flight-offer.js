/**
 * @file /controllers/api/settings/content/flight-offer/create-flight-offer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 07 May, 2024
 */

// dependencies
const { FlightOffer } = require('../../../../../models');

// export create flight offer controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const validatedData = req.body;
        const { thumbnail } = req.files;

        // create flight offer
        const flightOffer = new FlightOffer({
            ...validatedData,
            thumbnail: thumbnail.path,
        });

        // save flight offer
        await flightOffer.save();

        // send response
        return res.status(200).send({
            message: 'Created flight offer successfully',
            flightOffer,
        });
    } catch (error) {
        return next(error);
    }
};
