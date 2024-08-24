/**
 * @file /controllers/api/umrah/packages/get-umrah-package.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 25 April, 2024
 * @update_date 09 May, 2024
 */

// dependencies
const mongoose = require('mongoose');
const { UmrahPackage } = require('../../../../models');

// export get umrah package controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;

        // Build the query object based on user role
        const query = { _id: new mongoose.Types.ObjectId(id) };
        // if (req.user.role === 'customer') {
        //     query.status = 'active'; // Add status condition for customers
        // }

        // Define the aggregation pipeline
        const pipeline = [
            { $match: query }, // Match the document based on the query
            {
                $lookup: {
                    from: 'umrahpackagetypes',
                    localField: 'type',
                    foreignField: '_id',
                    as: 'packageType',
                },
            },
            {
                $unwind: {
                    path: '$packageType',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'umrahpackagedurations',
                    localField: 'totalDaysAndNights',
                    foreignField: '_id',
                    as: 'totalDaysAndNights',
                },
            },
            {
                $unwind: {
                    path: '$totalDaysAndNights',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
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
                    totalDaysAndNights: {
                        days: 1,
                        nights: 1,
                    },
                    partialPaymentExpiryDate: 1,
                },
            },
        ];

        // Apply aggregation
        const [umrahPackage] = await UmrahPackage.aggregate(pipeline);

        // Check if umrah package exists
        if (!umrahPackage) {
            return res.status(404).json({
                message: 'Umrah package not found or not available',
            });
        }

        // Send response
        return res.status(200).json({
            message: 'Fetched umrah package successfully',
            umrahPackage,
        });
    } catch (error) {
        return next(error);
    }
};
