/**
 * @file controllers/api/umrah/bookings/submit-booking-for-review.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 July, 2024
 */

// dependencies
const {
    UMRAH_BOOKING_PAYMENT_TYPE,
    UMRAH_BOOKING_STATUS,
} = require('../../../../constants/umrah-bookings');
const { UmrahBooking, Wallet, Invoice } = require('../../../../models');
const mongoose = require('mongoose');
const moment = require('moment');
const sendEmail = require('../../../../utils/mails/send-email');

// export submit umrah bookings for review view controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;

        // get umrah booking
        const umrahBooking = await UmrahBooking.findOne({
            _id: id,
            customer: req.user._id,
            status: UMRAH_BOOKING_STATUS[0],
        });

        // check if umrah booking exists
        if (!umrahBooking) {
            return res.status(404).send({
                message:
                    'Umrah booking not found or this package is already booked',
            });
        }

        // Define the aggregation pipeline stages
        const matchingStage = {
            $match: {
                _id: new mongoose.Types.ObjectId(id),
                customer: new mongoose.Types.ObjectId(req.user._id),
            },
        };

        // Lookup umrah package details
        const umrahPackageLookUp = {
            $lookup: {
                from: 'umrahpackages',
                localField: 'umrahPackage',
                foreignField: '_id',
                as: 'umrahPackage',
            },
        };

        // Unwind the umrah package details array
        const umrahUnwindStage = {
            $unwind: {
                path: '$umrahPackage',
                preserveNullAndEmptyArrays: true,
            },
        };

        // Lookup travelers details
        const travelersLookupStage = {
            $lookup: {
                from: 'travelers',
                localField: '_id',
                foreignField: 'umrahBooking',
                as: 'travelers',
            },
        };

        // Unwind the travelers array
        const travelersUnwindStage = {
            $unwind: {
                path: '$travelers',
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

        // Define the projection stage to control data delivery
        const projectionStage = {
            $project: {
                _id: 1,
                bookingId: 1,
                customer: 1,
                umrahPackage: {
                    title: 1,
                    subtitle: 1,
                    title: 1,
                    departureLocation: 1,
                    journeyDate: 1,
                    inclusions: 1,
                    totalDaysAndNights: {
                        days: 1,
                        nights: 1,
                    },
                },
                priceByTravelers: 1,
            },
        };

        // Perform aggregation
        const [result] = await UmrahBooking.aggregate([
            matchingStage,
            umrahPackageLookUp,
            umrahUnwindStage,
            travelersLookupStage,
            travelersUnwindStage,
            umrahTotalDaysAndNightsLookUp,
            unwindUmrahTotalDaysAndNightsTypeStage,
            groupByTravelersStage,
            calculateSubtotalsStage,
            projectionStage,
        ]);

        // Check is there any adult traveler associated with this package or not
        if (!result?.priceByTravelers?.adult?.count) {
            return res.status(400).send({
                message:
                    'To book this package there should be one adult traveler',
            });
        }

        // update umrah booking
        umrahBooking.set({
            status: UMRAH_BOOKING_STATUS[4],
            invoiceId: invoice._id,
        });

        // save umrah booking
        await umrahBooking.save();

        // send response
        return res.status(200).send({
            message: `Your umrah package booked successfully and an email has sended to your email:${req.user.email}`,
            bookedPackageDetails: result,
        });
    } catch (error) {
        return next(error);
    }
};
