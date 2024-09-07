/**
 * @file controllers/api/invoice/get-all-invoice-by-payment-type.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 01 August, 2024
 */

// dependencies
const { Invoice } = require('../../../models');
const mongoose = require('mongoose');

// Controller to get all invoices by payment type
module.exports = async (req, res, next) => {
    try {
        const { paymentType } = req.params;

        // Query object to filter by payment type
        const query = { paymentType };

        // Check user role
        if (req.user.role === 'customer') {
            // For customers, fetch only their invoices
            query.customer = new mongoose.Types.ObjectId(req.user._id);
        }

        // Fetch invoices based on role and payment type
        const invoices = await Invoice.find(query).populate(
            'customer',
            '-password -loginHistory -twoStepAuth -wallet'
        );

        // Send response
        return res.status(200).json(invoices);
    } catch (error) {
        return next(error);
    }
};
