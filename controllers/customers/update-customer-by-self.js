/**
 * @file /controllers/api/customers/update-customer-by-self.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 April, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const { Customer } = require('../../models');

// export update customer by self controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const validatedCustomer = req.body;
        const { avatar } = req.files;

        // get customer id
        const { _id } = req.user;

        // get customer
        const customer = await Customer.findById(_id);

        // check if customer exists
        if (!customer) {
            return res.status(404).json({
                message: 'Customer not found',
            });
        }

        // update customer
        customer.set({
            ...customer.toObject(),
            ...validatedCustomer,
            avatar: avatar?.path || customer.avatar,
        });

        // save customer
        await customer.save();

        // success response
        return res.status(200).json({
            message: 'Updated customer successfully',
            customer,
        });
    } catch (error) {
        return next(error);
    }
};
