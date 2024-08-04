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
                umrahPackage: 1,
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
            projectStage,
        ]);

        console.log(umrahBookingsWithTravelers);

        // Return render view
        return res.render('dashboard/umrah/bookings/booking-details', {
            title: 'Booking Reference',
            umrahBooking: umrahBookingsWithTravelers,
        });
    } catch (error) {
        return res.redirect('/dashboard/error/500');
    }
};
