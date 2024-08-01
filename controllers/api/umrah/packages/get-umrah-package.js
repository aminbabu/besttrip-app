/**
 * @file /controllers/api/umrah/packages/get-umrah-package.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 25 April, 2024
 * @update_date 09 May, 2024
 */

// dependencies
const { UmrahPackage } = require('../../../../models');

// export get umrah package controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;

        // get umrah package
        const umrahPackage = await UmrahPackage.findById(id);

        // check if umrah package exists
        if (!umrahPackage) {
            return res.status(200).json({
                message: 'Umrah package package not found',
            });
        }

        // send response
        return res.status(200).json({
            message: 'Fetched umrah package package successfully',
            umrahPackage,
        });
    } catch (error) {
        return next(error);
    }
};
