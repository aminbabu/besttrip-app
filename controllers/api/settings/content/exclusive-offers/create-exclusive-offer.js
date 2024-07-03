/**
 * @file /controllers/api/settings/content/exclusive-offer/create-exclusive-offer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 03 Jul, 2024
 */

// dependencies
const { ExclusiveOffer } = require('../../../../../models');

// export create exclusive offer controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { link, status } = req.body;
        const { thumbnail } = req.files;

        // check if thumbnail is uploaded
        if (!thumbnail) {
            return res.status(400).json({
                message: 'Please upload a thumbnail',
            });
        }

        // create exclusive offer
        const exclusiveOffer = new ExclusiveOffer({
            link,
            status,
            thumbnail: thumbnail.path,
        });

        // save exclusive offer
        await exclusiveOffer.save();

        // send response
        return res.status(201).send({
            message: 'Created exclusive offer successfully',
            exclusiveOffer,
        });
    } catch (error) {
        return next(error);
    }
};
