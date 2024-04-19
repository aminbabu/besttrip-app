/**
 * @file /controllers/settings/content/hotel-offer/create-hotel-offer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { HotelOffer } = require('../../../../models');

// export create hotel offer controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { link, status } = req.body;

        // create hotel offer
        const hotelOffer = await HotelOffer.create({
            link,
            status,
        });

        // send response
        return res.status(201).send({
            message: 'Created hotel offer successfully',
            hotelOffer,
        });
    } catch (error) {
        return next(error);
    }
};
