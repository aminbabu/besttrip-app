/**
 * @file /controllers/api/umrah/package-types/delete-many-umrah-package-type.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 19 April 2024
 */

// dependencies
const { UmrahPackageType } = require('../../../../models');

// export delete payments settings controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { ids } = req.body;

        // get payments settings
        const umrahPackageTypes = await UmrahPackageType.find({
            _id: { $in: ids },
        });

        // check if any payment settings not found
        if (umrahPackageTypes.length === 0) {
            return res.status(200).send({
                message: 'No payments settings found with the provided IDs',
            });
        }

        // delete payments settings
        await UmrahPackageType.deleteMany({ _id: { $in: ids } });

        // return response
        return res.status(200).json({
            message: 'Deleted payments settings successfully',
            umrahPackageTypes,
        });
    } catch (error) {
        return next(error);
    }
};
