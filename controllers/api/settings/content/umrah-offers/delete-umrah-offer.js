/**
 * @file /controllers/api/settings/content/umrah-offers/delete-umrah-offer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 03 Jul, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
const { UmrahOffer } = require('../../../../../models');

// export delete umrah offer controller
module.exports = async (req, res, next) => {
    try {
        const { id } = req.params;

        // get umrah offer
        const umrahOffer = await UmrahOffer.findById(id);

        // check if umrah offer exists
        if (!umrahOffer) {
            return res.status(404).send({
                message: 'Umrah offer not found',
            });
        }

        // delete umrah offer
        await umrahOffer.deleteOne();

        // delete umrah offer thumbnail
        if (umrahOffer?.thumbnail) {
            fs.unlinkSync(
                path.join(
                    __dirname,
                    '../../../../../public',
                    umrahOffer.thumbnail
                )
            );
        }

        // send response
        return res.status(200).send({
            message: 'Deleted umrah offer successfully',
            umrahOffer,
        });
    } catch (error) {
        return next(error);
    }
};
