/**
 * @file controllers/api/invoice/update-partial-payment-time-limit.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 01 August, 2024
 */

// dependencies
const { Invoice } = require('../../../models');

// Controller to update invoice for the logged-in customer
module.exports = async (req, res, next) => {
    try {
        // Fetch invoice by ID
        const invoice = await Invoice.findById(req.params.id);

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        const newExpiryDate = new Date(req.body.partialPaymentExpiryDate);
        const currentExpiryDate = new Date(invoice.partialPaymentExpiryDate);

        // Ensure the new date is valid
        if (isNaN(newExpiryDate.getTime())) {
            return res
                .status(200)
                .json({ message: 'Invalid expiry date provided' });
        }

        // Check if the incoming date is greater than the previous expiry date
        if (newExpiryDate <= currentExpiryDate) {
            return res.status(200).json({
                message:
                    "New expiry date can't be less than or equal to the previous expiry date",
            });
        }

        if (
            req.body.partialPaymentExpiryDate &&
            invoice.partialPaymentExpiryDate
        ) {
            // Update partialPaymentExpiryDate if provided in the request body
            invoice.partialPaymentExpiryDate =
                req.body.partialPaymentExpiryDate;
            await invoice.save();
        } else {
            return res.status(200).json({
                message:
                    "Partial payment expiry date can't be updated because the invoice is marked as 'full-payment'",
            });
        }

        // Send response
        return res.status(200).json({
            message: 'Partial payment expiry date updated',
            invoice,
        });
    } catch (error) {
        // Pass error to the error handler
        return next(error);
    }
};
