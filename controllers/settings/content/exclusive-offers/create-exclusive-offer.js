/**
 * @file /controllers/settings/content/exclusive-offer/create-exclusive-offer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { ContentExclusiveOffers } = require('../../../../models');

// export create exclusive offer controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { link, status } = req.body;

        // create exclusive offer
        const exclusiveOffer = await ContentExclusiveOffers.create({
            link,
            status,
        });

        // send response
        return res.status(201).send({
            message: 'Created exclusive offer successfully',
            exclusiveOffer,
        });
    } catch (error) {
        return next(error);
    }
};
