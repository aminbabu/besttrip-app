/**
 * @file /controllers/api/umrah/package-types/update-umrah-package-type.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 28 April, 2024
 */

// dependencies
const { UmrahPackageType } = require('../../../../models');

// export update umrah package type controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;
        const { name, status } = req.body;

        // get umrah package type
        const umrahPackageType = await UmrahPackageType.findById(id);

        // check if umrah package type not found
        if (!umrahPackageType) {
            return res.status(404).json({
                message: 'Umrah package type not found',
            });
        }

        // check if umrah package type already exists
        const existingUmrahPackageType = await UmrahPackageType.findOne({
            name,
            _id: { $ne: id },
        });

        // check if umrah package type already exists
        if (existingUmrahPackageType) {
            return res.status(409).json({
                message: 'Umrah package type already exists',
            });
        }

        // update umrah package type
        umrahPackageType.set({
            name,
            status,
        });

        // save umrah package type
        await umrahPackageType.save();

        // send response
        return res.status(200).json({
            message: 'Updated umrah package type successfully',
            umrahPackageType,
        });
    } catch (error) {
        return next(error);
    }
};
