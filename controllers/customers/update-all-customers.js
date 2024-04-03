/**
 * @file /controllers/customers/update-all-customers.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 April, 2024
 * @update_date 04 April, 2024
 */

// dependencies
const { Customer } = require('../../models');

// update all customers
const updateAllCustomers = async (req, res, next) => {
    try {
        // Update all customers
        const customers = await Customer.updateMany({}, req.body);

        // Check if any documents were modified
        if (customers.matchedCount > 0) {
            // Fetch all customers after update
            const updatedCustomers = await Customer.find();

            // Return response with updated data
            return res.status(200).json({
                message: 'All customers updated successfully',
                customers: updatedCustomers,
            });
        }
        return res.status(200).json({
            message: 'No customers were updated',
            customers: [],
        });
    } catch (error) {
        return next(error);
    }
};

// export controller
module.exports = updateAllCustomers;
