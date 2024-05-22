/**
 * @file /controllers/settings/content/hotel-offers/delete-hotel-offer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 07 May, 2024
 */

// dependencies
const { HotelOffer } = require('../../../../../models');

// export get hotel offers by id controller
module.exports = async (req, res, next) => {
    try {
        const { id } = req.params;

        // get hotel offers
        const hotelOffer = await HotelOffer.findById(id);

        // check if hotel offer exists
        if (!hotelOffer) {
            return res.status(404).send({
                message: 'Hotel offer not found',
            });
        }

        // send response
        return res.send({
            message: 'Fetched hotel offer successfully',
            hotelOffer,
        });
    } catch (error) {
        return next(error);
    }
};
