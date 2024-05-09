/**
 * @file /controllers/umrah/packages/get-umrah-packages.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 25 April, 2024
 * @update_date 09 May, 2024
 */

// dependencies
const { UmrahPackage } = require('../../../models');

// export get umrah packages controller
module.exports = async (req, res, next) => {
    try {
        // get umrah packages
        const umrahPackages = await UmrahPackage.find();

        // send response
        return res.status(200).json({
            message: 'Fetched umrah package packages successfully',
            umrahPackages,
        });
    } catch (error) {
        return next(error);
    }
};
