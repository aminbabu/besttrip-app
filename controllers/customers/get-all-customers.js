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
const { generateToken } = require('../../utils');

// get all customers
const getAllCustomers = async (req, res, next) => {
    try {
        // get all customers
        const customers = await Customer.find();

        // generate token
        const token = generateToken(req.user);

        // return response
        return res.status(200).json({
            message: 'Fetched all customers successfully',
            customers,
            token,
        });
    } catch (error) {
        return next(error);
    }
};

// export controller
module.exports = getAllCustomers;
