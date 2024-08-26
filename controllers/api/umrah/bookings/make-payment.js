/**
 * @file controllers/api/umrah/bookings/make-payment.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 01 August, 2024
 */

// dependencies
const mongoose = require('mongoose');
const { Invoice, Wallet, UmrahBooking } = require('../../../../models');
const moment = require('moment');
const {
    UMRAH_BOOKING_PAYMENT_TYPE,
    UMRAH_BOOKING_STATUS,
} = require('../../../../constants/umrah-bookings');
const sendEmail = require('../../../../utils/mails/send-email');

// Controller to handle the rest of the partial payment
module.exports = async (req, res, next) => {
    try {
        const { id } = req.params; // Booking ID
        const { paymentType } = req.body;

        // Define matching stage
        const matchingStage = {
            $match: {
                customer: new mongoose.Types.ObjectId(req.user._id),
                umrahPackage: new mongoose.Types.ObjectId(id),
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
                umrahPackage: 1,
                priceByTravelers: 1,
            },
        };

        // Perform aggregation
        const [umrahBooking] = await UmrahBooking.aggregate([
            matchingStage,
            umrahPackageLookUp,
            umrahUnwindStage,
            travelersLookupStage,
            travelersUnwindStage,
            groupByTravelersStage,
            calculateSubtotalsStage,
            projectionStage,
        ]);

        const bookingDetails = await UmrahBooking.findOne({
            customer: new mongoose.Types.ObjectId(req.user._id),
            umrahPackage: new mongoose.Types.ObjectId(id),
        });

        if (!umrahBooking) {
            return res.status(404).send({ message: 'Umrah Booking not found' });
        }

        // Check if the partial payment expiry date has passed
        const currentDate = new Date();

        // Get wallet details
        const walletDetails = await Wallet.findOne({
            customer: req.user._id,
        });

        if (!walletDetails) {
            return res.status(404).send({ message: 'Wallet not found' });
        }

        // Declare the invoice variable outside the conditional blocks
        let invoice;

        if (bookingDetails?.invoiceId) {
            invoice = await Invoice.findById({
                _id: bookingDetails?.invoiceId,
            });
        }

        // Handling the second partial payment here
        if (invoice && invoice?.paymentType === UMRAH_BOOKING_PAYMENT_TYPE[0]) {
            if (
                paymentType === UMRAH_BOOKING_PAYMENT_TYPE[1] &&
                invoice &&
                invoice?.paymentType === UMRAH_BOOKING_PAYMENT_TYPE[0]
            ) {
                return res.status(404).send({
                    message:
                        'You can not make full payment cause you already made an partial payment. Now for the rest of the payment you have to select the partial payment type again.',
                });
            }

            if (invoice.partialPaymentExpiryDate < currentDate) {
                return res.status(400).send({
                    message: 'Payment is no longer valid due to expiry.',
                });
            }

            if (invoice.partialPaymentRestAmount === 0) {
                return res.status(400).send({
                    message: 'You may have already completed the full payment.',
                });
            }
            if (walletDetails.balance < invoice.partialPaymentRestAmount) {
                // Update wallet balance
                return res
                    .status(400)
                    .send({ message: 'Insufficient balance' });
            }

            // Deduct the partial payment from the wallet
            walletDetails.balance -= invoice.partialPaymentRestAmount;

            await walletDetails.save();

            // Updating the invoice details
            invoice.paidAmount = invoice.totalAmount;
            invoice.partialPaymentRestAmount = 0;
            await invoice.save();

            return res.status(200).send({
                message: 'Partial payment has been completed successfully.',
                invoice,
            });
        }
        // For first time partial payment logic
        else if (paymentType === UMRAH_BOOKING_PAYMENT_TYPE[0]) {
            if (invoice?.paymentType === UMRAH_BOOKING_PAYMENT_TYPE[1]) {
                return res.status(400).send({
                    message: 'You may have already completed the full payment.',
                });
            }

            if (umrahBooking.umrahPackage.partialPaymentExpiryDate) {
                if (
                    umrahBooking.umrahPackage.partialPaymentExpiryDate <
                    currentDate
                ) {
                    return res.status(400).send({
                        message: 'Payment is no longer valid due to expiry.',
                    });
                }

                const totalPartialPaidAmount =
                    umrahBooking?.priceByTravelers?.adult?.partialSubtotal +
                    umrahBooking?.priceByTravelers?.child?.partialSubtotal +
                    umrahBooking?.priceByTravelers?.infant?.partialSubtotal;

                const totalAmount =
                    umrahBooking?.priceByTravelers?.adult?.subtotal +
                    umrahBooking?.priceByTravelers?.child?.subtotal +
                    umrahBooking?.priceByTravelers?.infant?.subtotal;

                // Update wallet balance
                if (walletDetails.balance < totalPartialPaidAmount) {
                    return res
                        .status(400)
                        .send({ message: 'Insufficient balance' });
                }

                // Deduct the partial payment from the wallet
                walletDetails.balance -= totalPartialPaidAmount;

                await walletDetails.save();

                // Create the invoice for the partial payment
                invoice = await Invoice.create({
                    invoiceId: `INV-${moment().format(
                        'YYYYMMDD'
                    )}-${Math.random()
                        .toString(36)
                        .substr(2, 6)
                        .toUpperCase()}`,
                    bookingId: umrahBooking._id,
                    customer: req.user._id,
                    totalAmount: totalAmount,
                    paymentType: paymentType,
                    partialPaymentExpiryDate:
                        umrahBooking.umrahPackage.partialPaymentExpiryDate,
                    paidAmount: totalPartialPaidAmount,
                    partialPaymentRestAmount:
                        totalAmount - totalPartialPaidAmount,
                });

                // Update the umrah booking status
                await UmrahBooking.findByIdAndUpdate(
                    umrahBooking._id,
                    {
                        status: UMRAH_BOOKING_STATUS[4],
                        invoiceId: invoice._id,
                    },
                    { new: true }
                );

                // send mail
                await sendEmail(
                    (to = req.user.email),
                    (subject = 'Partial Payment Invoice'),
                    (text = `Your partial payment of ${totalPartialPaidAmount} has been received. Your invoice ID is ${invoice.invoiceId}. Please complete the payment by ${invoice.partialPaymentExpiryDate}. And if you are late then your previous payment will not be refundable.`),
                    (err) => console.log(err)
                );

                return res.status(200).send({
                    message: `Your payment received successfully and an email has sended to your email:${req.user.email}`,
                    invoice,
                });
            } else {
                return res.status(400).send({
                    message:
                        'This package has no partial payment option. You have to do the full payment.',
                });
            }
        }
        // For full payment logic
        else if (paymentType === UMRAH_BOOKING_PAYMENT_TYPE[1]) {
            if (
                invoice &&
                invoice?.paymentType === UMRAH_BOOKING_PAYMENT_TYPE[0]
            ) {
                return res.status(404).send({
                    message:
                        'You can not make full payment cause you already made an partial payment. Now for the rest of the payment you have to select the partial payment type again.',
                });
            }

            if (invoice) {
                return res.status(404).send({
                    message: 'You may have already completed the full payment.',
                });
            }

            const totalAmount =
                umrahBooking?.priceByTravelers?.adult?.subtotal +
                umrahBooking?.priceByTravelers?.child?.subtotal +
                umrahBooking?.priceByTravelers?.infant?.subtotal;

            // Update wallet balance
            if (walletDetails.balance < totalAmount) {
                return res
                    .status(400)
                    .send({ message: 'Insufficient balance' });
            }

            // Deduct the full payment from the wallet
            walletDetails.balance -= totalAmount;
            await walletDetails.save();

            // Create the invoice for the full payment
            invoice = await Invoice.create({
                invoiceId: `INV-${moment().format('YYYYMMDD')}-${Math.random()
                    .toString(36)
                    .substr(2, 6)
                    .toUpperCase()}`,
                bookingId: umrahBooking._id,
                customer: req.user._id,
                totalAmount: totalAmount,
                paymentType: paymentType,
                paidAmount: totalAmount,
            });

            // Update the umrah booking status
            await UmrahBooking.findByIdAndUpdate(
                umrahBooking._id,
                {
                    status: UMRAH_BOOKING_STATUS[4],
                    invoiceId: invoice._id,
                },
                { new: true }
            );

            // send mail
            await sendEmail(
                (to = req.user.email),
                (subject = 'Full Payment Invoice'),
                (text = `Your full payment of ${totalAmount} has been received. Your invoice ID is ${invoice.invoiceId}.`),
                (err) => console.log(err)
            );

            return res.status(200).send({
                message: `Your payment received successfully and an email has sended to your email:${req.user.email}`,
                invoice,
            });
        }
    } catch (error) {
        return next(error);
    }
};
