/**
 * @file /controllers/customers/delete-customer-by-id.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 29 March, 2024
 * @update_date 29 March, 2024
 */

// dependencies
const { Customer } = require('../../models');
const { generateToken } = require('../../utils');

// delete customer by mongo id
const deleteCustomerById = async (req, res, next) => {
    try {
        // get customer id
        const { id } = req.params;

        // get customer
        const customer = await Customer.findById(id);

        // delete customer
        await customer.deleteOne();

        // generate token
        const token = generateToken(req.user);

        // return response
        return res.status(200).json({
            message: 'Deleted customer successfully',
            customer,
            token,
        });
    } catch (error) {
        return next(error);
    }
};

// export controller
module.exports = deleteCustomerById;
