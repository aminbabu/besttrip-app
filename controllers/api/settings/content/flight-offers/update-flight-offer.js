/**
 * @file /controllers/api/settings/content/flight-offers/get-flight-offers.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 07 May, 2024
 */

// dependencies
const { FlightOffer } = require('../../../../../models');

// export update flight offer controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;
        const validatedData = req.body;
        const { thumbnail } = req.files;

        // get flight offer
        const flightOffer = await FlightOffer.findById(id);

        // check if flight offer exists
        if (!flightOffer) {
            return res.status(404).send({
                message: 'Flight offer not found',
            });
        }

        // update flight offer
        flightOffer.set({
            ...validatedData,
            thumbnail: thumbnail?.path || flightOffer.thumbnail,
        });

        // save flight offer
        await flightOffer.save();

        // send response
        return res.status(200).send({
            message: 'Updated flight offer successfully',
            flightOffer,
        });
    } catch (error) {
        return next(error);
    }
};
