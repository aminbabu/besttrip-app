/**
 * @file controllers/api/invoice/get-all-invoice-by-payment-type.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 01 August, 2024
 */

// Dependencies
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

        // Stage 1: Match invoices by payment type
        const matchingStage = {
            $match: query, // Filter by paymentType and customer if applicable
        };

        // Stage 2: Lookup the customer details
        const customerLookupStage = {
            $lookup: {
                from: 'customers', // Collection to join with
                localField: 'customer',
                foreignField: '_id',
                as: 'customerDetails',
            },
        };

        // Stage 3: Unwind the customer details
        const customerUnwindStage = {
            $unwind: {
                path: '$customerDetails', // Unwind array to single object
                preserveNullAndEmptyArrays: true, // Keep documents without matching customerDetails
            },
        };

        // Stage 4: Lookup the booking details
        const bookingLookupStage = {
            $lookup: {
                from: 'umrahbookings', // Lookup for the umrah bookings
                localField: 'bookingId',
                foreignField: '_id',
                as: 'bookingDetails',
            },
        };

        // Stage 5: Unwind the booking details
        const bookingUnwindStage = {
            $unwind: {
                path: '$bookingDetails', // Unwind array to single object
                preserveNullAndEmptyArrays: true, // Keep documents without matching bookingDetails
            },
        };

        // Stage 6: Projection stage
        const projectStage = {
            $project: {
                // Exclude sensitive fields from the customer
                'customerDetails.password': 0,
                'customerDetails.loginHistory': 0,
                'customerDetails.twoStepAuth': 0,
                'customerDetails.wallet': 0,
                'customerDetails.dob': 0,
                'customerDetails.avatar': 0,
                'customerDetails.updatedAt': 0,
                'customerDetails.createdAt': 0,
                'customerDetails.__v': 0,
                bookingId: 0,
                customer: 0,
            },
        };

        // Initialize the pipeline array
        const pipeline = [
            matchingStage,
            customerLookupStage,
            customerUnwindStage,
            bookingLookupStage,
            bookingUnwindStage,
            projectStage,
        ];

        // If the user is a customer, ensure their invoices are fetched
        if (req.user.role === 'customer') {
            pipeline.unshift(matchingStage); // Add the matching stage for customers at the beginning
        }

        // Execute the aggregation
        const invoices = await Invoice.aggregate(pipeline);

        // Send response
        return res.status(200).json({
            message: 'Invoices fetched successfully',
            invoices,
        });
    } catch (error) {
        return next(error);
    }
};
