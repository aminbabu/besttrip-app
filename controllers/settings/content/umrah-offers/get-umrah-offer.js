/**
 * @file /controllers/api/settings/content/umrah-offers/delete-umrah-offer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 08 May, 2024
 */

// dependencies
const { UmrahOffer } = require('../../../../models');

// export get umrah offers by id controller
module.exports = async (req, res, next) => {
    try {
        const { id } = req.params;

        // get umrah offers
        const umrahOffer = await UmrahOffer.findById(id);

        // check if umrah offer exists
        if (!umrahOffer) {
            return res.status(404).send({
                message: 'Umrah offer not found',
            });
        }

        // send response
        return res.send({
            message: 'Fetched umrah offer successfully',
            umrahOffer,
        });
    } catch (error) {
        return next(error);
    }
};
