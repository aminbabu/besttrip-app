/**
 * @file /controllers/api/settings/content/umrah-offer/create-umrah-offer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 08 May, 2024
 */

// dependencies
const { UmrahOffer } = require('../../../../../models');

// export create umrah offer controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const validatedData = req.body;
        const { thumbnail } = req.files;

        // create umrah offer
        const umrahOffer = new UmrahOffer({
            ...validatedData,
            thumbnail: thumbnail.path,
        });

        // save umrah offer
        await umrahOffer.save();

        // send response
        return res.status(200).send({
            message: 'Created umrah offer successfully',
            umrahOffer,
        });
    } catch (error) {
        return next(error);
    }
};
