/**
 * @file /controllers/umrah/package-types/delete-umrah-package-type.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 28 April, 2024
 */

// dependencies
const { UmrahPackageType } = require('../../../models');

// export delete umrah package type controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;

        // get umrah package type
        const umrahPackageType = await UmrahPackageType.findById(id);

        // check if umrah package type not found
        if (!umrahPackageType) {
            return res.status(404).json({
                message: 'Umrah package type not found',
            });
        }

        // delete umrah package type
        await umrahPackageType.deleteOne();

        // send response
        return res.status(200).json({
            message: 'Deleted umrah package type successfully',
            umrahPackageType,
        });
    } catch (error) {
        return next(error);
    }
};
