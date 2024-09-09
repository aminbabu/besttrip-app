/**
 * @file controllers/dashboard/umrah/packages/view-umrah-packages.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const { UmrahPackage } = require('../../../../models');

// export umrah packages view controller
module.exports = async (req, res) => {
    try {
        // Stage 1: Lookup umrahpackagedurations to include duration details
        const lookupDurationStage = {
            $lookup: {
                from: 'umrahpackagedurations',
                localField: 'totalDaysAndNights',
                foreignField: '_id',
                as: 'durationDetails',
            },
        };

        // Stage 2: Unwind the durationDetails array
        const unwindDurationStage = {
            $unwind: {
                path: '$durationDetails',
                preserveNullAndEmptyArrays: true,
            },
        };

        // Stage 3: Lookup umrahpackagetypes to include type details
        const lookupTypeStage = {
            $lookup: {
                from: 'umrahpackagetypes',
                localField: 'type',
                foreignField: '_id',
                as: 'typeDetails',
            },
        };

        // Stage 4: Unwind the typeDetails array
        const unwindTypeStage = {
            $unwind: {
                path: '$typeDetails',
                preserveNullAndEmptyArrays: true,
            },
        };

        // Stage 5: Project the final output with required fields
        const projectStage = {
            $project: {
                _id: 1,
                thumbnail: 1,
                title: 1,
                schedule: 1,
                journeyDate: 1,
                type: '$typeDetails.name',
                duration: {
                    days: '$durationDetails.days',
                    nights: '$durationDetails.nights',
                },
                seats: 1,
                departureLocation: 1,
                inclusions: 1,
                status: 1,
                adultPrice: 1,
                adultPartialPrice: 1,
                childPrice: 1,
                childPartialPrice: 1,
                infantPrice: 1,
                infantPartialPrice: 1,
                updatedAt: 1,
            },
        };

        // Aggregate umrah packages with defined stages
        const umrahPackages = await UmrahPackage.aggregate([
            lookupDurationStage,
            unwindDurationStage,
            lookupTypeStage,
            unwindTypeStage,
            projectStage,
        ]);

        // return render view
        return res.render('dashboard/umrah/packages', {
            title: 'Umrah Packages',
            umrahPackages,
        });
    } catch (error) {
        return res.redirect('/error/500');
    }
};
