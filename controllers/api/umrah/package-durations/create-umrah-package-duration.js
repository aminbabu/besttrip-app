/**
 * @file /controllers/api/umrah/package-durations/create-umrah-package-duration.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 09 May, 2024
 */

// dependencies
const { UmrahPackageDuration } = require('../../../../models');

// export create umrah package duration controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { days, nights, status } = req.body;

        // check if umrah package duration already exists
        const existingUmrahPackageDuration = await UmrahPackageDuration.findOne(
            { days, nights }
        );

        // check if umrah package duration already exists
        if (existingUmrahPackageDuration) {
            return res.status(409).json({
                message: 'Umrah package duration already exists',
            });
        }

        // create umrah package duration
        const umrahPackageDuration = new UmrahPackageDuration({
            days,
            nights,
            status,
        });

        // save umrah package duration
        await umrahPackageDuration.save();

        // send response
        return res.status(201).json({
            message: 'Created umrah package duration successfully',
            umrahPackageDuration,
        });
    } catch (error) {
        return next(error);
    }
};
