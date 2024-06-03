/**
 * @file /controllers/api/umrah/package-types/get-umrah-package-types.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 28 April, 2024
 */

// dependencies
const { UmrahPackageType } = require('../../../models');

// export get umrah package types controller
module.exports = async (req, res, next) => {
    try {
        // get all umrah package types
        const umrahPackageTypes = await UmrahPackageType.find();

        // send response
        return res.status(200).json({
            message: 'Fetched all umrah package types successfully',
            umrahPackageTypes,
        });
    } catch (error) {
        return next(error);
    }
};
