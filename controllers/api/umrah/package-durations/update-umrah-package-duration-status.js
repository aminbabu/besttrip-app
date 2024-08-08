/**
 * @file /controllers/api/umrah/package-durations/update-umrah-package-duration-status.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 09 May, 2024
 */

// dependencies
const { UmrahPackageDuration } = require('../../../../models');

// export update umrah package duration status controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;
        const { status } = req.body;

        // get umrah package duration
        const umrahPackageDuration = await UmrahPackageDuration.findById(id);

        // check if umrah package duration not found
        if (!umrahPackageDuration) {
            return res.status(404).json({
                message: 'Umrah package duration not found',
            });
        }

        // update umrah package duration
        umrahPackageDuration.set({
            status,
        });

        // save umrah package duration
        await umrahPackageDuration.save();

        // send response
        return res.status(200).json({
            message: 'Updated umrah package duration status successfully',
            umrahPackageDuration,
        });
    } catch (error) {
        return next(error);
    }
};
