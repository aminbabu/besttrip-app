/**
 * @file controllers/api/invoice/invoice-for-customer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 01 August, 2024
 */

// dependencies
const { Invoice } = require('../../../models');

// Controller to get invoice for the logged-in customer
module.exports = async (req, res, next) => {
    try {
        // Fetch invoice for the logged-in customer
        const invoice = await Invoice.findById({ _id: req.params.id });

        if (!invoice) {
            return res.status(200).json({ message: 'Invoice not found' });
        }

        // Send response
        return res.status(200).json(invoice);
    } catch (error) {
        return next(error);
    }
};
