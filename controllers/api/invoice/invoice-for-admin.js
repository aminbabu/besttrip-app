/**
 * @file controllers/api/invoice/invoice-for-admin.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 01 August, 2024
 */

// dependencies
const { Invoice } = require('../../../models');

// Controller to get invoice for admin
module.exports = async (req, res, next) => {
    try {
        // Fetch invoice by ID and populate customer field
        const invoice = await Invoice.findById(req.params.id).populate(
            'customer',
            '-password -loginHistory -twoStepAuth -wallet'
        );

        if (!invoice) {
            return res.status(200).json({ message: 'Invoice not found' });
        }

        // Send response
        return res.status(200).json(invoice);
    } catch (error) {
        return next(error);
    }
};
