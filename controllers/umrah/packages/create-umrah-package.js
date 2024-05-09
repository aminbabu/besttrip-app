/**
 * @file /controllers/umrah/packages/create-umrah-package.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 25 April, 2024
 * @update_date 09 May, 2024
 */

// dependencies
const { UmrahPackage } = require('../../../models');

// export create umrah package controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const validatedData = req.body;

        // create umrah package
        const umrahPackage = new UmrahPackage(validatedData);

        // save umrah package
        await umrahPackage.save();

        // send response
        return res.status(201).json({
            message: 'Created umrah package package successfully',
            umrahPackage,
        });
    } catch (error) {
        return next(error);
    }
};
