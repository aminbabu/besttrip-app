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

// export get umrah packages controller
module.exports = async (req, res, next) => {
    try {
        // Extract query parameters from the request body
        const {
            packageSchedule,
            packageType,
            packageDuration,
            dataLength = 10, // Default to 10 if not provided
            skip = 0, // Default skip value for pagination
        } = req.body;

        // Convert skip and dataLength to numbers and validate
        const parsedSkip = parseInt(skip, 10);
        const parsedDataLength = parseFloat(dataLength);

        if (isNaN(parsedSkip) || parsedSkip < 0) {
            throw new Error('Skip value must be a non-negative integer');
        }

        if (isNaN(parsedDataLength) || parsedDataLength < 1) {
            throw new Error(
                'Default data length must be a number and at least 1'
            );
        }

        // Stage to filter documents based on provided criteria
        const matchingStage = {
            $match: {
                $and: [
                    { status: 'active' }, // Ensure status is 'active'
                    packageSchedule ? { schedule: packageSchedule } : {},
                    packageType ? { type: packageType } : {},
                    {
                        $expr: {
                            $gte: [
                                {
                                    $subtract: ['$expiryDate', '$journeyDate'],
                                },
                                packageDuration * 24 * 60 * 60 * 1000, // convert days to milliseconds
                            ],
                        },
                    },
                ],
            },
        };

        // Stage to calculate subtotal and partialSubtotal for each package
        const addNewFieldsOfPrices = {
            $addFields: {
                subtotal: {
                    $add: [
                        { $ifNull: ['$adultPrice', 0] },
                        { $ifNull: ['$childPrice', 0] },
                        { $ifNull: ['$infantPrice', 0] },
                    ],
                },
                partialSubtotal: {
                    $add: [
                        { $ifNull: ['$adultPartialPrice', 0] },
                        { $ifNull: ['$childPartialPrice', 0] },
                        { $ifNull: ['$infantPartialPrice', 0] },
                    ],
                },
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
                type: 1,
                status: 1,
                adultPrice: 1,
                childPrice: 1,
                infantPrice: 1,
                subtotal: 1,
                adultPartialPrice: 1,
                childPartialPrice: 1,
                infantPartialPrice: 1,
                partialSubtotal: 1,
                seats: 1,
                inclusions: 1,
                extraThumbnails: 1,
                outboundAirlineCode: 1,
                outboundFlightNumber: 1,
                outboundBookingClass: 1,
                outboundAirCraftModel: 1,
                outboundDepartureAirport: 1,
                outboundArrivalAirport: 1,
                outboundDepartureDatetime: 1,
                outboundArrivalDatetime: 1,
                outboundFlightStops: 1,
                outboundLayoverFirstDuration: 1,
                outboundLayoverFirstAirport: 1,
                outboundLayoverSecondDuration: 1,
                outboundLayoverSecondAirport: 1,
                outboundAdultBaggageCheckin: 1,
                outboundAdultBaggageCabin: 1,
                outboundChildBaggageCheckin: 1,
                outboundChildBaggageCabin: 1,
                outboundInfantBaggageCheckin: 1,
                outboundInfantBaggageCabin: 1,
                makkahHotelThumbnail: 1,
                makkahHotelNoOfNights: 1,
                makkahHotelName: 1,
                makkahHotelAddress: 1,
                makkahHotelRating: 1,
                makkahHotelDistance: 1,
                makkahHotelDistanceUnit: 1,
                makkahHotelWalkDuration: 1,
                makkahHotelLocation: 1,
                makkahHotelNote: 1,
                makkahHotelExtraThumbnails: 1,
                madinahHotelThumbnail: 1,
                madinahHotelNoOfNights: 1,
                madinahHotelName: 1,
                madinahHotelAddress: 1,
                madinahHotelRating: 1,
                madinahHotelDistance: 1,
                madinahHotelDistanceUnit: 1,
                madinahHotelWalkDuration: 1,
                madinahHotelLocation: 1,
                madinahHotelNote: 1,
                madinahHotelExtraThumbnails: 1,
                inboundAirlineCode: 1,
                inboundFlightNumber: 1,
                inboundBookingClass: 1,
                inboundAirCraftModel: 1,
                inboundDepartureAirport: 1,
                inboundArrivalAirport: 1,
                inboundDepartureDatetime: 1,
                inboundArrivalDatetime: 1,
                inboundFlightStops: 1,
                inboundLayoverFirstDuration: 1,
                inboundLayoverFirstAirport: 1,
                inboundLayoverSecondDuration: 1,
                inboundLayoverSecondAirport: 1,
                inboundAdultBaggageCheckin: 1,
                inboundAdultBaggageCabin: 1,
                inboundChildBaggageCheckin: 1,
                inboundChildBaggageCabin: 1,
                inboundInfantBaggageCheckin: 1,
                inboundInfantBaggageCabin: 1,
                visaType: 1,
                visaNoOfEntries: 1,
                visaDuration: 1,
                visaValidity: 1,
                visaOptions: 1,
                visaNote: 1,
                transportType: 1,
                transportAirportToHotel: 1,
                transportVisitorPlaces: 1,
                transportHotelToAirport: 1,
                transportServices: 1,
                transportServiceTypes: 1,
                transportNote: 1,
                ziyarahDays: 1,
                ziyarahMakkah: 1,
                ziyarahMadinah: 1,
                ziyarahTaif: 1,
                ziyarahMakkaDetails: 1,
                ziyarahMadinaDetails: 1,
                ziyarahTaifDetails: 1,
                ziyarahNote: 1,
                itineraryDays: 1,
                umrahThumbnail: 1,
                umrahTitle: 1,
                umrahExcerpt: 1,
                umrahDescription: 1,
                termsConditions: 1,
            },
        };

        // Stage to handle pagination
        const paginationStage = {
            $facet: {
                metadata: [
                    { $count: 'total' }, // Count total items
                ],
                umrahPackages: [
                    { $sort: { _id: 1 } }, // Ensure sorting to handle pagination
                    { $skip: parsedSkip }, // Skip the number of documents already fetched
                    { $limit: parsedDataLength }, // Limit the number of documents returned
                ],
            },
        };

        // apply aggregation
        const [result] = await UmrahPackage.aggregate([
            matchingStage,
            addNewFieldsOfPrices,
            projectionStage,
            paginationStage,
        ]);

        // Determine if there are more items to fetch
        const hasMore = result.umrahPackages.length === parsedDataLength;

        // Send response
        return res.status(200).json({
            message: 'Fetched umrah packages successfully',
            data: {
                umrahPackages: result.umrahPackages,
                metadata: result.metadata[0],
                hasMore, // Indicate if there are more items to fetch
                skip: parsedSkip + parsedDataLength, // Update skip for next request
            },
        });
    } catch (error) {
        return next(error);
    }
};
