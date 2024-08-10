/**
 * @file controllers/dashboard/umrah/packages/view-edit-umrah-package.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 22 June, 2024
 */

// dependencies
const mongoose = require('mongoose');
const {
    UmrahPackage,
    UmrahPackageDuration,
    UmrahPackageType,
} = require('../../../../models');

// export umrah package edit view controller
module.exports = async (req, res) => {
    try {
        // get id from request params
        const { id } = req.params;

        // get umrah package with aggregation
        const umrahPackage = await UmrahPackage.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: 'umrahpackagetypes',
                    localField: 'type',
                    foreignField: '_id',
                    as: 'typeDetails',
                },
            },
            {
                $unwind: '$typeDetails',
            },
            {
                $lookup: {
                    from: 'umrahpackagedurations',
                    localField: 'totalDaysAndNights',
                    foreignField: '_id',
                    as: 'durationDetails',
                },
            },
            {
                $unwind: {
                    path: '$durationDetails',
                    preserveNullAndEmptyArrays: true,
                },
            },
        ]).exec();

        const umrahPackageDurations = await UmrahPackageDuration.find({
            status: 'active',
        });

        const umrahPackageTypes = await UmrahPackageType.find({
            status: 'active',
        });

        // check if umrah package not found
        if (!umrahPackage.length) {
            return res.redirect('/dashboard/errors/404');
        }

        console.log(umrahPackage[0]);

        // return render view
        return res.render('dashboard/umrah/packages/edit', {
            title: 'Edit Umrah Package',
            umrahPackage: umrahPackage[0],
            umrahPackageDurations,
            umrahPackageTypes,
        });
    } catch (error) {
        console.error(error);
        return res.redirect('/dashboard/error/500');
    }
};
