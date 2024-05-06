/**
 * @file /controllers/settings/content/hotel-offer/create-hotel-offer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 06 May, 2024
 */

// dependencies
const { HotelOffer } = require('../../../../models');

// export create hotel offer controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { link, status } = req.body;
        const { thumbnail } = req.files;

        // create hotel offer
        const hotelOffer = new HotelOffer({
            link,
            status,
            thumbnail: thumbnail.path,
        });

        // save hotel offer
        await hotelOffer.save();

        // send response
        return res.status(201).send({
            message: 'Created hotel offer successfully',
            hotelOffer,
        });
    } catch (error) {
        return next(error);
    }
};
