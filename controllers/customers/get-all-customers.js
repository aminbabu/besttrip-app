/**
 * @file /controllers/customers/get-all-customers.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 29 March, 2024
 * @update_date 02 April, 2024
 */

// dependencies
const { Customer } = require('../../models');

// export get all customers controller
module.exports = async (req, res, next) => {
    try {
        // get all customers
        const customers = await Customer.find();

        // return response
        return res.status(200).json({
            message: 'Fetched all customers successfully',
            customers,
        });
    } catch (error) {
        return next(error);
    }
};
