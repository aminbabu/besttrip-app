/**
 * @file /controllers/api/umrah/packages/get-umrah-packages-for-customers
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 25 April, 2024
 * @update_date 28 July, 2024
 */

// dependencies
const { UmrahPackage } = require('../../../../models');
const mongoose = require('mongoose');

// export get umrah packages controller
module.exports = async (req, res, next) => {
    try {
        // Extract query parameters from the request body
        const {
            packageSchedule,
            packageType,
            packageDuration,
            dataLength,
            adultTravelers,
            childTravelers,
            infantsTravelers,
            lastItemId,
        } = req.body;

        // Convert dataLength to a number and validate
        const parsedDataLength = parseFloat(dataLength);

        if (isNaN(parsedDataLength) || parsedDataLength < 1) {
            throw new Error(
                'Default data length must be a number and at least 1'
            );
        }

        // Convert traveler values to numbers and validate
        const parsedAdultTravelers = parseFloat(adultTravelers);
        const parsedChildTravelers = parseFloat(childTravelers);
        const parsedInfantsTravelers = parseFloat(infantsTravelers);

        if (isNaN(parsedAdultTravelers) || parsedAdultTravelers < 0) {
            throw new Error('Adult travelers must be a non-negative number');
        }

        if (isNaN(parsedChildTravelers) || parsedChildTravelers < 0) {
            throw new Error('Child travelers must be a non-negative number');
        }

        if (isNaN(parsedInfantsTravelers) || parsedInfantsTravelers < 0) {
            throw new Error('Infants travelers must be a non-negative number');
        }

        // Validate and convert  packageDuration, and lastItemId to ObjectIds if provided
        const packageDurationObjectId = mongoose.Types.ObjectId.isValid(
            packageDuration
        )
            ? new mongoose.Types.ObjectId(packageDuration)
            : null;

        const packageTypeObjectId = mongoose.Types.ObjectId.isValid(
            packageDuration
        )
            ? new mongoose.Types.ObjectId(packageType)
            : null;

        const lastItemObjectId = mongoose.Types.ObjectId.isValid(lastItemId)
            ? new mongoose.Types.ObjectId(lastItemId)
            : null;

        // Ensure the total number of travelers does not exceed the number of seats
        const totalTravelers =
            parsedAdultTravelers +
            parsedChildTravelers +
            parsedInfantsTravelers;

        // Stage to filter documents based on provided criteria
        const matchingStage = {
            $match: {
                status: 'active', // Ensure status is 'active'
                schedule: packageSchedule,
                type: packageTypeObjectId,
                totalDaysAndNights: packageDurationObjectId,
                $expr: {
                    $gte: [{ $subtract: ['$seats', totalTravelers] }, 0], // Ensure sufficient seats
                },
            },
        };

        // Lookup umrah package type details
        const umrahPackageTypeLookUp = {
            $lookup: {
                from: 'umrahpackagetypes',
                localField: 'type',
                foreignField: '_id',
                as: 'packageType',
            },
        };

        // Unwind the umrah package type details
        const unwindUmrahPackageTypeStage = {
            $unwind: {
                path: '$packageType',
                preserveNullAndEmptyArrays: true,
            },
        };

        // Lookup umrah package total days and nights details
        const umrahTotalDaysAndNightsLookUp = {
            $lookup: {
                from: 'umrahpackagedurations',
                localField: 'totalDaysAndNights',
                foreignField: '_id',
                as: 'totalDaysAndNights',
            },
        };

        // Unwind the umrah package total days and nights details
        const unwindUmrahTotalDaysAndNightsTypeStage = {
            $unwind: {
                path: '$totalDaysAndNights',
                preserveNullAndEmptyArrays: true,
            },
        };

        // Stage to specify which fields to include in the output
        const projectionStage = {
            $project: {
                _id: 1,
                thumbnail: 1,
                title: 1,
                subtitle: 1,
                departureLocation: 1,
                schedule: 1,
                journeyDate: 1,
                expiryDate: 1,
                type: '$packageType.name',
                status: 1,
                adultPrice: 1,
                childPrice: 1,
                infantPrice: 1,
                adultPartialPrice: 1,
                childPartialPrice: 1,
                infantPartialPrice: 1,
                seats: 1,
                inclusions: 1,
                totalDaysAndNights: {
                    days: 1,
                    nights: 1,
                },
                partialPaymentExpiryDate: 1,
            },
        };

        // Stage to handle pagination with cursor-based approach
        const paginationStage = {
            $facet: {
                metadata: [
                    { $count: 'total' }, // Count total items
                ],
                umrahPackages: [
                    { $sort: { _id: 1 } }, // Ensure sorting to handle pagination
                    {
                        $match: lastItemObjectId
                            ? { _id: { $gt: lastItemObjectId } }
                            : {},
                    }, // Fetch items after lastItemId
                    { $limit: parsedDataLength }, // Limit the number of documents returned
                ],
            },
        };

        // apply aggregation
        const [result] = await UmrahPackage.aggregate([
            matchingStage,
            // addNewFieldsOfPrices,
            umrahPackageTypeLookUp,
            unwindUmrahPackageTypeStage,
            umrahTotalDaysAndNightsLookUp,
            unwindUmrahTotalDaysAndNightsTypeStage,
            projectionStage,
            paginationStage,
        ]);

        // Determine if there are more items to fetch
        const hasMore = result.umrahPackages.length === parsedDataLength;

        // Get the ID of the last item in the result to be used as cursor for next request
        const nextCursor =
            result.umrahPackages.length > 0
                ? result.umrahPackages[result.umrahPackages.length - 1]._id
                : null;

        // Send response
        return res.status(200).json({
            message: 'Fetched umrah packages successfully',
            data: {
                umrahPackages: result.umrahPackages,
                metadata: result.metadata[0],
                hasMore, // Indicate if there are more items to fetch
                nextCursor, // ID of the last item for next request
            },
        });
    } catch (error) {
        return next(error);
    }
};
