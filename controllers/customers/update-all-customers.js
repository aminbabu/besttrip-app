/**
 * @file /controllers/customers/update-all-customers.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 April, 2024
 * @update_date 03 April, 2024
 */

// dependencies
const { Customer } = require('../../models');

// update all customers
const updateAllCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.updateMany({}, req.body);

        return res.status(200).json({
            success: true,
            message: 'all customers updated successfully',
            customers,
        });
    } catch (error) {
        return next(error);
    }
};

// export controller
module.exports = updateAllCustomers;
