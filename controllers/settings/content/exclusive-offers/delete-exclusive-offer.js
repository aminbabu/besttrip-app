/**
 * @file /controllers/api/settings/content/exclusive-offers/delete-exclusive-offer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 11 May, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
const { ExclusiveOffer } = require('../../../../models');

// export delete exclusive offer controller
module.exports = async (req, res, next) => {
    try {
        const { id } = req.params;

        // get exclusive offer
        const exclusiveOffer = await ExclusiveOffer.findById(id);

        // check if exclusive offer exists
        if (!exclusiveOffer) {
            return res.status(404).send({
                message: 'Exclusive offer not found',
            });
        }

        // delete exclusive offer
        await exclusiveOffer.deleteOne();

        // delete exclusive offer thumbnail
        if (exclusiveOffer?.thumbnail) {
            fs.unlinkSync(path.join(__dirname, '../../../../../public/', exclusiveOffer.thumbnail));
        }

        // send response
        return res.send({
            message: 'Deleted exclusive offer successfully',
            exclusiveOffer,
        });
    } catch (error) {
        return next(error);
    }
};
