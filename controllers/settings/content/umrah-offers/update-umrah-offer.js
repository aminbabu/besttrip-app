/**
 * @file /controllers/api/settings/content/umrah-offers/get-umrah-offers.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 08 May, 2024
 */

// dependencies
const { UmrahOffer } = require('../../../../models');

// export update umrah offer controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;
        const validatedData = req.body;
        const { thumbnail } = req.files;

        // get umrah offer
        const umrahOffer = await UmrahOffer.findById(id);

        // check if umrah offer exists
        if (!umrahOffer) {
            return res.status(404).send({
                message: 'Umrah offer not found',
            });
        }

        // update umrah offer
        umrahOffer.set({
            ...validatedData,
            thumbnail: thumbnail.path,
        });

        // save umrah offer
        await umrahOffer.save();

        // send response
        return res.send({
            message: 'Updated umrah offer successfully',
            umrahOffer,
        });
    } catch (error) {
        return next(error);
    }
};
