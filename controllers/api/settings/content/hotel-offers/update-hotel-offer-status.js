/**
 * @file /controllers/api/settings/content/hotel-offers/get-hotel-offers-status.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 Jul, 2024
 * @update_date 17 Jul, 2024
 */

// dependencies
const { HotelOffer } = require('../../../../../models');

// export update hotel offer status controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;
        const { status } = req.body;

        // get hotel offer
        const hotelOffer = await HotelOffer.findById(id);

        // check if hotel offer exists
        if (!hotelOffer) {
            return res.status(404).send({
                message: 'Hotel offer not found',
            });
        }

        // update hotel offer
        hotelOffer.set({ status });

        // save hotel offer
        await hotelOffer.save();

        // send response
        return res.status(200).send({
            message: 'Updated hotel offer status successfully',
            hotelOffer,
        });
    } catch (error) {
        return next(error);
    }
};
