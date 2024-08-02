/**
 * @file /controllers/api/settings/content/exclusive-offers/get-exclusive-offers-status.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 Jul, 2024
 * @update_date 03 Jul, 2024
 */

// dependencies
const { ExclusiveOffer } = require('../../../../../models');

// export update exclusive offer status controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;
        const { status } = req.body;

        // get exclusive offer
        const exclusiveOffer = await ExclusiveOffer.findById(id);

        // check if exclusive offer exists
        if (!exclusiveOffer) {
            return res.status(200).send({
                message: 'Exclusive offer not found',
            });
        }

        // update exclusive offer
        exclusiveOffer.set({ status });

        // save exclusive offer
        await exclusiveOffer.save();

        // send response
        return res.status(200).send({
            message: 'Updated exclusive offer status successfully',
            exclusiveOffer,
        });
    } catch (error) {
        return next(error);
    }
};
