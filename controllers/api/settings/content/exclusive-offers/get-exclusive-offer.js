/**
 * @file /controllers/api/settings/content/exclusive-offers/delete-exclusive-offer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 03 Jul, 2024
 */

// dependencies
const { ExclusiveOffer } = require('../../../../../models');

// export get exclusive offers by id controller
module.exports = async (req, res, next) => {
    try {
        const { id } = req.params;

        // get exclusive offers
        const exclusiveOffer = await ExclusiveOffer.findById(id);

        // check if exclusive offer exists
        if (!exclusiveOffer) {
            return res.status(404).send({
                message: 'Exclusive offer not found',
            });
        }

        // send response
        return res.status(200).send({
            message: 'Fetched exclusive offer successfully',
            exclusiveOffer,
        });
    } catch (error) {
        return next(error);
    }
};
