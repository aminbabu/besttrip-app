/**
 * @file /controllers/settings/content/hotel-offers/get-hotel-offers.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { HotelOffer } = require('../../../../../models');

// export get hotel offers controller
module.exports = async (req, res, next) => {
    try {
        // get hotel offers
        const hotelOffers = await HotelOffer.find();

        // send response
        return res.send({
            message: 'Fetched hotel offers successfully',
            hotelOffers,
        });
    } catch (error) {
        return next(error);
    }
};
