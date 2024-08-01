/**
 * @file controllers/api/umrah/bookings/restOfThePartialPayment.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 01 August, 2024
 */

// dependencies
const mongoose = require('mongoose');
const { Invoice, Wallet } = require('../../../../models');
const {
    UMRAH_BOOKING_PAYMENT_TYPE,
} = require('../../../../constants/umrah-bookings');
const sendEmail = require('../../../../utils/mails/send-email');

// Controller to handle the rest of the partial payment
module.exports = async (req, res, next) => {
    try {
        const { id } = req.params; // Booking ID
        const { partialPaymentAmount } = req.body; // Amount to be paid

        // Fetch the invoice for the partial payment
        const invoice = await Invoice.findOne({
            bookingId: id,
            paymentType: UMRAH_BOOKING_PAYMENT_TYPE[0], // Partial payment
        });

        if (!invoice) {
            return res.status(200).send({ message: 'Invoice not found' });
        }

        // Check if the partial payment expiry date has passed
        const currentDate = new Date();
        if (invoice.partialPaymentExpiryDate < currentDate) {
            return res
                .status(200)
                .send({ message: 'Payment is no longer valid due to expiry' });
        }

        // Validate amounts are numbers
        if (
            isNaN(invoice.paidAmount) ||
            isNaN(invoice.partialPaymentRestAmount)
        ) {
            return res.status(200).send({ message: 'Invalid invoice amounts' });
        }

        // Calculate remaining amount
        const remainingAmount = invoice.partialPaymentRestAmount;

        if (partialPaymentAmount > remainingAmount) {
            return res.status(200).send({
                message:
                    "Payment amount exceeds remaining balance or you've done the full payment",
            });
        }

        // Update invoice with new paid amount and rest amount
        invoice.paidAmount =
            (Number(invoice.paidAmount) || 0) + Number(partialPaymentAmount);
        invoice.partialPaymentRestAmount =
            (Number(invoice.partialPaymentRestAmount) || 0) -
            Number(partialPaymentAmount);

        await invoice.save();

        // Fetch wallet details
        const walletDetails = await Wallet.findOne({ customer: req.user._id });

        if (walletDetails.balance < partialPaymentAmount) {
            return res.status(200).send({ message: 'Insufficient balance' });
        }

        // Update wallet balance
        walletDetails.balance -= partialPaymentAmount;
        await walletDetails.save();

        // Send email notification
        const to = req.user.email;
        const subject = 'Partial Payment Update';
        const text = `Your payment of ${partialPaymentAmount} has been received. Remaining balance on your invoice is ${invoice.partialPaymentRestAmount}.`;

        await sendEmail(to, subject, text, (err) => console.log(err));

        // Send response
        return res.status(200).send({
            message: `Partial payment processed successfully and an email has been sent to your email: ${req.user.email}`,
            invoice,
            walletDetails,
        });
    } catch (error) {
        return next(error);
    }
};
