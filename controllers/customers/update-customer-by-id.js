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

        // check if customer exists
        const customer = await Customer.findById(id);

        // check if customer exists
        if (!customer) {
            return res.status(404).json({
                message: 'Customer not found',
            });
        }

        // update customer
        customer.set({ ...req.body });

        // save customer
        await customer.save();

        // generate token
        const token = generateToken(req.user);

        // return response
        return res.status(200).json({
            message: 'Updated customer successfully',
            customer,
            token,
        });
    } catch (error) {
        return next(error);
    }
};

// export controller
module.exports = updateCustomerById;
