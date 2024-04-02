/**
 * @file /controllers/customers/update-customer-by-id.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 29 March, 2024
 * @update_date 29 March, 2024
 */

// dependencies
const { Customer } = require('../../models');
const { generateToken } = require('../../utils');

// update customer by mongo id
const updateCustomerById = async (req, res, next) => {
    try {
        // get customer id
        const { id } = req.params;

        // update customer and return updated customer
        const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        // generate token
        const token = generateToken(req.user);

        // return response
        return res.status(200).json({
            message: 'Customer updated successfully',
            customer: updatedCustomer,
            token,
        });
    } catch (error) {
        return next(error);
    }
};

// export controller
module.exports = updateCustomerById;
