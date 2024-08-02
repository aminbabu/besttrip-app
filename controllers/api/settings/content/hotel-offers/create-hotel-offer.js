/**
 * @file /controllers/api/settings/content/hotel-offer/create-hotel-offer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 07 May, 2024
 */

// dependencies
const { HotelOffer } = require('../../../../../models');

// export create hotel offer controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const validatedData = req.body;
        const { thumbnail } = req.files;

        // create hotel offer
        const hotelOffer = new HotelOffer({
            ...validatedData,
            thumbnail: thumbnail.path,
        });

        // save hotel offer
        await hotelOffer.save();

        // send response
        return res.status(200).send({
            message: 'Created hotel offer successfully',
            hotelOffer,
        });
    } catch (error) {
        return next(error);
    }
};
