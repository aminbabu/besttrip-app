/**
 * @file /controllers/api/settings/content/umrah-offers/get-umrah-offers.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 20 April, 2024
 */

// dependencies
const { UmrahOffer } = require('../../../../../models');

// export get umrah offers controller
module.exports = async (req, res, next) => {
    try {
        // get umrah offers
        const umrahOffers = await UmrahOffer.find();

        // send response
        return res.send({
            message: 'Fetched umrah offers successfully',
            umrahOffers,
        });
    } catch (error) {
        return next(error);
    }
};
