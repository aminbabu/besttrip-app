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
        const matchStage = {
            $match: {
                umrahPackage: new mongoose.Types.ObjectId(id),
            },
        };

        // Define umrah package lookup stage
        const lookupUmrahPackageStage = {
            $lookup: {
                from: 'umrahpackages',
                localField: 'umrahPackage',
                foreignField: '_id',
                as: 'package',
            },
        };

        // Define umrah package unwind stage
        const unwindUmrahPackageStage = {
            $unwind: {
                path: '$package',
                preserveNullAndEmptyArrays: true,
            },
        };
        // Define umrah package projection stage
        const umrahBookingProjection = {
            $project: {
                _id: 1,
                status: 1,
                bookingRefId: 1,
                invoiceId: 1,
                package: {
                    partialPaymentExpiryDate: 1,
                    partialPaymentTotalAmount: 1,
                    totalPaymentAmount: 1,
                },
            },
        };

        // Aggregate umrah bookings with travelers
        const [umrahBooking] = await UmrahBooking.aggregate([
            matchStage,
            lookupUmrahPackageStage,
            unwindUmrahPackageStage,
            umrahBookingProjection,
        ]);

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

        if (umrahBooking?.invoiceId) {
            invoice = await Invoice.findById({
                _id: umrahBooking?.invoiceId,
            });
        }

        if (invoice?.paymentType === UMRAH_BOOKING_PAYMENT_TYPE[0]) {
            return console.log(invoice);
        } else {
            return console.log(invoice);
        }

        if (paymentType === UMRAH_BOOKING_PAYMENT_TYPE[0]) {
            // For partial payment logic
            if (umrahBooking.package.partialPaymentExpiryDate) {
                if (
                    umrahBooking.package.partialPaymentExpiryDate < currentDate
                ) {
                    return res.status(400).send({
                        message: 'Payment is no longer valid due to expiry.',
                    });
                }

                // Update wallet balance
                if (
                    walletDetails.balance <
                    umrahBooking.package.partialPaymentTotalAmount
                ) {
                    return res
                        .status(400)
                        .send({ message: 'Insufficient balance' });
                }

                // Deduct the partial payment from the wallet
                walletDetails.balance -=
                    umrahBooking.package.partialPaymentTotalAmount;
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
                    totalAmount: umrahBooking.package.totalPaymentAmount,
                    paymentType: paymentType,
                    partialPaymentExpiryDate:
                        umrahBooking.package.partialPaymentExpiryDate,
                    paidAmount: umrahBooking.package.partialPaymentTotalAmount,
                    partialPaymentRestAmount:
                        umrahBooking.package.totalPaymentAmount -
                        umrahBooking.package.partialPaymentTotalAmount,
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
                    (text = `Your partial payment of ${umrahBooking.package.partialPaymentTotalAmount} has been received. Your invoice ID is ${invoice.invoiceId}. Please complete the payment by ${invoice.partialPaymentExpiryDate}. And if you are late then your previous payment will not be refundable.`),
                    (err) => console.log(err)
                );
            } else {
                return res.status(400).send({
                    message:
                        'This package has no partial payment option. You have to do the full payment.',
                });
            }
        } else if (paymentType === UMRAH_BOOKING_PAYMENT_TYPE[1]) {
            // Update wallet balance
            if (
                walletDetails.balance < umrahBooking.package.totalPaymentAmount
            ) {
                return res
                    .status(400)
                    .send({ message: 'Insufficient balance' });
            }

            // Deduct the full payment from the wallet
            walletDetails.balance -= umrahBooking.package.totalPaymentAmount;
            await walletDetails.save();

            // Create the invoice for the full payment
            invoice = await Invoice.create({
                invoiceId: `INV-${moment().format('YYYYMMDD')}-${Math.random()
                    .toString(36)
                    .substr(2, 6)
                    .toUpperCase()}`,
                bookingId: umrahBooking._id,
                customer: req.user._id,
                totalAmount: umrahBooking.package.totalPaymentAmount,
                paymentType: paymentType,
                paidAmount: umrahBooking.package.totalPaymentAmount,
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
                (text = `Your full payment of ${umrahBooking.package.totalPaymentAmount} has been received. Your invoice ID is ${invoice.invoiceId}.`),
                (err) => console.log(err)
            );
        }

        return res.status(200).send({
            message: `Your payment received successfully and an email has sended to your email:${req.user.email}`,
            invoice,
            bookedPackageDetails: umrahBooking,
        });
    } catch (error) {
        return next(error);
    }
};
