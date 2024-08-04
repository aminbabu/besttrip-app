/**
 * @file controllers/api/invoice/get-all-invoice-for-admin.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 01 August, 2024
 */

// dependencies
const { Invoice } = require('../../../models');

// Controller to get all invoices for admin
module.exports = async (req, res, next) => {
    try {
        // Fetch all invoices and populate customer field
        const invoices = await Invoice.find({}).populate(
            'customer',
            '-password -loginHistory -twoStepAuth -wallet'
        );

        // Send response
        return res.status(200).json(invoices);
    } catch (error) {
        return next(error);
    }
};
