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
const sendEmail = require('../../../../utils/mails/send-email');

// export submit umrah bookings for review view controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;
        const { paymentType, partialPaymentAmount } = req.body;

        // get umrah booking
        const umrahBooking = await UmrahBooking.findOne({
            _id: id,
            customer: req.user._id,
            status: UMRAH_BOOKING_STATUS[0],
        });

        // check if umrah booking exists
        if (!umrahBooking) {
            return res.status(200).send({
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
                umrahPackage: 1,
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
            groupByTravelersStage,
            calculateSubtotalsStage,
            projectionStage,
        ]);

        // Calculate full payment subtotal
        const fullPaymentSubtotal =
            (result?.priceByTravelers?.adult?.subtotal || 0) +
            (result?.priceByTravelers?.child?.subtotal || 0) +
            (result?.priceByTravelers?.infant?.subtotal || 0);

        const partialSubtotal =
            (result?.priceByTravelers?.adult?.partialSubtotal || 0) +
            (result?.priceByTravelers?.child?.partialSubtotal || 0) +
            (result?.priceByTravelers?.infant?.partialSubtotal || 0);

        // Get wallet details
        const walletDetails = await Wallet.findOne({
            customer: req.user._id,
        });

        let invoice = null;

        if (paymentType === UMRAH_BOOKING_PAYMENT_TYPE[0]) {
            // Generate invoice for partial payment
            invoice = new Invoice({
                invoiceId: `INV-${new mongoose.Types.ObjectId()}`,
                bookingId: id,
                customer: req.user._id,
                totalAmount: partialSubtotal,
                paymentType: paymentType,
                partialPaymentExpiryDate: new Date(
                    Date.now() + 15 * 24 * 60 * 60 * 1000
                ), // 15 days from now
                paidAmount: partialPaymentAmount,
                partialPaymentRestAmount:
                    partialSubtotal - partialPaymentAmount,
            });

            await invoice.save();

            // Update wallet balance
            if (walletDetails.balance < partialPaymentAmount) {
                return res
                    .status(200)
                    .send({ message: 'Insufficient balance' });
            }

            walletDetails.balance -= partialPaymentAmount;
            await walletDetails.save();

            // update umrah booking
            umrahBooking.set({ status: UMRAH_BOOKING_STATUS[4] });

            // save umrah booking
            await umrahBooking.save();

            // send mail
            await sendEmail(
                (to = req.user.email),
                (subject = 'Partial Payment Invoice'),
                (text = `Your partial payment of ${partialPaymentAmount} has been received. Your invoice ID is ${invoice.invoiceId}. Please complete the payment by ${invoice.partialPaymentExpiryDate}. And if you are late then your previous payment will not be refundable.`),
                (err) => console.log(err)
            );
        } else if (paymentType === UMRAH_BOOKING_PAYMENT_TYPE[1]) {
            // Generate invoice for full payment
            invoice = new Invoice({
                invoiceId: `INV-${new mongoose.Types.ObjectId()}`,
                bookingId: id,
                customer: req.user._id,
                totalAmount: fullPaymentSubtotal,
                paymentType: paymentType,
                paidAmount: fullPaymentSubtotal,
            });

            await invoice.save();

            // Update wallet balance
            if (walletDetails.balance < fullPaymentSubtotal) {
                return res
                    .status(200)
                    .send({ message: 'Insufficient balance' });
            }

            walletDetails.balance -= fullPaymentSubtotal;
            await walletDetails.save();

            // update umrah booking
            umrahBooking.set({ status: UMRAH_BOOKING_STATUS[4] });

            // save umrah booking
            await umrahBooking.save();

            // send mail
            await sendEmail(
                (to = req.user.email),
                (subject = 'Full Payment Invoice'),
                (text = `Your full payment of ${fullPaymentSubtotal} has been received. Your invoice ID is ${invoice.invoiceId}.`),
                (err) => console.log(err)
            );
        }
        // send response
        return res.send({
            message: `Your umrah package booked successfully and an email has sended to your email:${req.user.email}`,
            invoice,
        });
    } catch (error) {
        return next(error);
    }
};
