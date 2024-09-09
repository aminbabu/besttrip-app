/**
 * @file controllers/dashboard/umrah/bookings/view-umrah-bookin.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const { UmrahBooking } = require('../../../../models');

// export umrah bookin view controller
module.exports = async (req, res) => {
    try {
        // get bookingRefId from request params
        const { id } = req.params;

        // Define matching stage
        const matchStage = {
            $match: { bookingRefId: id },
        };

        // Define customer lookup stage
        const lookupCustomerStage = {
            $lookup: {
                from: 'customers',
                localField: 'customer',
                foreignField: '_id',
                as: 'customer',
            },
        };

        // Define customer unwind stage
        const unwindCustomerStage = {
            $unwind: {
                path: '$customer',
                preserveNullAndEmptyArrays: true,
            },
        };

        // Define umrah package lookup stage
        const lookupUmrahPackageStage = {
            $lookup: {
                from: 'umrahpackages',
                localField: 'umrahPackage',
                foreignField: '_id',
                as: 'umrahPackage',
            },
        };

        // Define umrah package unwind stage
        const unwindUmrahPackageStage = {
            $unwind: {
                path: '$umrahPackage',
                preserveNullAndEmptyArrays: true,
            },
        };

        // Define travelers lookup stage
        const lookupTravelersStage = {
            $lookup: {
                from: 'travelers',
                localField: '_id',
                foreignField: 'umrahBooking',
                as: 'travelers',
            },
        };

        // Unwind the travelers array
        const unwindTravelersStage = {
            $unwind: {
                path: '$travelers',
                preserveNullAndEmptyArrays: true,
            },
        };

        // Group by traveler type and calculate counts and subtotals
        const groupByTravelersStage = {
            $group: {
                _id: '$_id',
                adultCount: {
                    $sum: {
                        $cond: [
                            { $eq: ['$travelers.travelerType', 'adult'] },
                            1,
                            0,
                        ],
                    },
                },
                childCount: {
                    $sum: {
                        $cond: [
                            { $eq: ['$travelers.travelerType', 'child'] },
                            1,
                            0,
                        ],
                    },
                },
                infantCount: {
                    $sum: {
                        $cond: [
                            { $eq: ['$travelers.travelerType', 'infant'] },
                            1,
                            0,
                        ],
                    },
                },
                umrahPackage: { $first: '$umrahPackage' },
                customer: { $first: '$customer' }, // Include customer in the result
                travelers: { $push: '$travelers' }, // Include travelers in the result
                bookingRefId: { $first: '$bookingRefId' }, // Ensure bookingRefId is included
                status: { $first: '$status' }, // Ensure status is included
            },
        };

        // Calculate subtotals based on traveler counts and package prices
        const calculateSubtotalsStage = {
            $addFields: {
                priceByTravelers: {
                    adult: {
                        count: { $ifNull: ['$adultCount', 0] },
                        subtotal: {
                            $multiply: [
                                { $ifNull: ['$adultCount', 0] },
                                { $ifNull: ['$umrahPackage.adultPrice', 0] },
                            ],
                        },
                        partialSubtotal: {
                            $multiply: [
                                { $ifNull: ['$adultCount', 0] },
                                {
                                    $ifNull: [
                                        '$umrahPackage.adultPartialPrice',
                                        0,
                                    ],
                                },
                            ],
                        },
                    },
                    child: {
                        count: { $ifNull: ['$childCount', 0] },
                        subtotal: {
                            $multiply: [
                                { $ifNull: ['$childCount', 0] },
                                { $ifNull: ['$umrahPackage.childPrice', 0] },
                            ],
                        },
                        partialSubtotal: {
                            $multiply: [
                                { $ifNull: ['$childCount', 0] },
                                {
                                    $ifNull: [
                                        '$umrahPackage.childPartialPrice',
                                        0,
                                    ],
                                },
                            ],
                        },
                    },
                    infant: {
                        count: { $ifNull: ['$infantCount', 0] },
                        subtotal: {
                            $multiply: [
                                { $ifNull: ['$infantCount', 0] },
                                { $ifNull: ['$umrahPackage.infantPrice', 0] },
                            ],
                        },
                        partialSubtotal: {
                            $multiply: [
                                { $ifNull: ['$infantCount', 0] },
                                {
                                    $ifNull: [
                                        '$umrahPackage.infantPartialPrice',
                                        0,
                                    ],
                                },
                            ],
                        },
                    },
                },
            },
        };

        // Define invoices lookup stage
        const lookupInvoicesStage = {
            $lookup: {
                from: 'invoices',
                localField: 'customer._id',
                foreignField: 'customer',
                as: 'invoiceDetails',
            },
        };

        // Define invoices unwind stage
        const unwindInvoicesStage = {
            $unwind: {
                path: '$invoiceDetails',
                preserveNullAndEmptyArrays: true,
            },
        };

        // Define umrah package types lookup stage
        const lookupUmrahPackageTypesStage = {
            $lookup: {
                from: 'umrahpackagetypes',
                localField: 'umrahPackage.type',
                foreignField: '_id',
                as: 'umrahPackageType',
            },
        };

        // Define umrah package types unwind stage
        const unwindUmrahPackageTypesStage = {
            $unwind: {
                path: '$umrahPackageType',
                preserveNullAndEmptyArrays: true,
            },
        };

        // Define result projection stage
        const projectStage = {
            $project: {
                _id: 1,
                customer: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    phone: 1,
                },
                umrahPackage: {
                    _id: 1,
                    thumbnail: 1,
                    title: 1,
                    subtitle: 1,
                    departureLocation: 1,
                    schedule: 1,
                    journeyDate: 1,
                    expiryDate: 1,
                    type: { $ifNull: ['$umrahPackageType.name', ''] }, // Include type name
                    status: 1,
                    adultPrice: 1,
                    adultPartialPrice: 1,
                    childPrice: 1,
                    childPartialPrice: 1,
                    infantPrice: 1,
                    infantPartialPrice: 1,
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
                    createdAt: 1,
                    updatedAt: 1,
                    totalDaysAndNights: 1,
                },
                bookingRefId: 1,
                status: 1,
                priceByTravelers: 1,
                travelers: 1,
                invoiceDetails: {
                    _id: 1,
                    partialPaymentExpiryDate: 1,
                    invoiceId: 1,
                    totalAmount: 1,
                    paidAmount: 1,
                    paymentType: 1,
                },
            },
        };

        // Aggregate umrah bookings with travelers
        const [umrahBookingsWithTravelers] = await UmrahBooking.aggregate([
            matchStage,
            lookupCustomerStage,
            unwindCustomerStage,
            lookupUmrahPackageStage,
            unwindUmrahPackageStage,
            lookupTravelersStage,
            unwindTravelersStage,
            groupByTravelersStage,
            calculateSubtotalsStage,
            lookupInvoicesStage,
            unwindInvoicesStage,
            lookupUmrahPackageTypesStage,
            unwindUmrahPackageTypesStage,
            projectStage,
        ]);

        console.log(umrahBookingsWithTravelers);

        // Return render view
        return res.render('dashboard/umrah/bookings/booking-details', {
            title: 'Booking Reference',
            umrahBooking: umrahBookingsWithTravelers,
        });
    } catch (error) {
        return res.redirect('/error/500');
    }
};
