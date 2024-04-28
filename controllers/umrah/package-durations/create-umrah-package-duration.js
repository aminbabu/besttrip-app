/**
 * @file /controllers/umrah/package-durations/create-umrah-package-duration.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 28 April, 2024
 */

// dependencies
const { UmrahPackageDuration } = require('../../../models');

// export create umrah package duration controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { days, nights, status } = req.body;

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
