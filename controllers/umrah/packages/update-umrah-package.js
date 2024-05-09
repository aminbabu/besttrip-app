/**
 * @file /controllers/umrah/packages/update-umrah-package.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 25 April, 2024
 * @update_date 09 May, 2024
 */

// dependencies
const { UmrahPackage } = require('../../../models');

// export update umrah package controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;
        const validatedData = req.body;

        // get umrah package
        const umrahPackage = await UmrahPackage.findById(id);

        // check if umrah package exists
        if (!umrahPackage) {
            return res.status(404).json({
                message: 'Umrah package package not found',
            });
        }

        // update umrah package
        umrahPackage.set(validatedData);

        // save umrah package
        await umrahPackage.save();

        // send response
        return res.status(200).json({
            message: 'Updated umrah package package successfully',
            umrahPackage,
        });
    } catch (error) {
        return next(error);
    }
};
