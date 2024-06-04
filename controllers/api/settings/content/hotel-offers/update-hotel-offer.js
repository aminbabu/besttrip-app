/**
 * @file /controllers/api/settings/content/hotel-offers/get-hotel-offers.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 07 May, 2024
 */

// dependencies
const { HotelOffer } = require('../../../../../models');

// export update hotel offer controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;
        const validated = req.body;
        const { thumbnail } = req.files;

        // get hotel offer
        const hotelOffer = await HotelOffer.findById(id);

        // check if hotel offer exists
        if (!hotelOffer) {
            return res.status(404).send({
                message: 'Hotel offer not found',
            });
        }

        // update hotel offer
        hotelOffer.set({
            ...validated,
            thumbnail: thumbnail.path,
        });

        // save hotel offer
        await hotelOffer.save();

        // send response
        return res.send({
            message: 'Updated hotel offer successfully',
            hotelOffer,
        });
    } catch (error) {
        return next(error);
    }
};
