/**
 * @file /controllers/api/settings/content/exclusive-offers/get-exclusive-offers.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { ExclusiveOffer } = require('../../../../models');

// export get exclusive offers controller
module.exports = async (req, res, next) => {
    try {
        // get exclusive offers
        const exclusiveOffers = await ExclusiveOffer.find();

        // send response
        return res.send({
            message: 'Fetched exclusive offers successfully',
            exclusiveOffers,
        });
    } catch (error) {
        return next(error);
    }
};
