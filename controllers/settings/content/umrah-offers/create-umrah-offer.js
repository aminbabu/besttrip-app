/**
 * @file /controllers/settings/content/umrah-offer/create-umrah-offer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 20 April, 2024
 */

// dependencies
const { UmrahOffer } = require('../../../../models');

// export create umrah offer controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { link, status } = req.body;

        // create umrah offer
        const umrahOffer = await UmrahOffer.create({
            link,
            status,
        });

        // send response
        return res.status(201).send({
            message: 'Created umrah offer successfully',
            umrahOffer,
        });
    } catch (error) {
        return next(error);
    }
};
