/**
 * @file /controllers/api/umrah/package-durations/delete-umrah-package-duration.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 28 April, 2024
 */

// dependencies
const { UmrahPackageDuration, UmrahPackage } = require('../../../../models');

// export delete umrah package duration controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;

        // get umrah package duration
        const umrahPackageDuration = await UmrahPackageDuration.findById(id);

        // check if umrah package duration not found
        if (!umrahPackageDuration) {
            return res.status(200).json({
                message: 'Umrah package duration not found',
            });
        }

        // check if umrah package duration is referenced by Umrah Package model
        const isReferenced = await UmrahPackage.exists({
            totalDaysAndNights: id,
        });

        if (isReferenced) {
            return res.status(400).json({
                message:
                    'Umrah package duration is referenced by other records and cannot be deleted',
            });
        }

        // delete umrah package duration
        await umrahPackageDuration.deleteOne();

        // send response
        return res.status(200).json({
            message: 'Deleted umrah package duration successfully',
            umrahPackageDuration,
        });
    } catch (error) {
        return next(error);
    }
};
