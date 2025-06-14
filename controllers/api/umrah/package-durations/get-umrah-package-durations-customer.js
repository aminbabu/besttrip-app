/**
 * @file /controllers/api/umrah/package-durations/get-umrah-package-durations-customer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 28 April, 2024
 */

// dependencies
const { UmrahPackageDuration } = require('../../../../models');

// export get umrah package durations controller
module.exports = async (req, res, next) => {
    try {
        // get all umrah package durations
        const umrahPackageDurations = await UmrahPackageDuration.find({
            status: 'active',
        });

        // send response
        return res.status(200).json({
            message: 'Fetched all umrah package durations successfully',
            umrahPackageDurations,
        });
    } catch (error) {
        return next(error);
    }
};
