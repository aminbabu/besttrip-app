/**
 * @file /controllers/api/settings/content/umrah-offers/get-umrah-offers-status.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 Jul, 2024
 * @update_date 17 Jul, 2024
 */

// dependencies
const { UmrahOffer } = require('../../../../../models');

// export update umrah offer status controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;
        const { status } = req.body;

        // get umrah offer
        const umrahOffer = await UmrahOffer.findById(id);

        // check if umrah offer exists
        if (!umrahOffer) {
            return res.status(404).send({
                message: 'Umrah offer not found',
            });
        }

        // update umrah offer
        umrahOffer.set({ status });

        // save umrah offer
        await umrahOffer.save();

        // send response
        return res.send({
            message: 'Updated umrah offer status successfully',
            umrahOffer,
        });
    } catch (error) {
        return next(error);
    }
};
