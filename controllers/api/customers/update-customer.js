/**
 * @file /controllers/api/customers/update-customer-by-id.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 29 March, 2024
 * @update_date 19 Aug, 2024
 */

// dependencies
const { Customer } = require('../../../models');

// export update customer by mongo id controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;
        const validatedCustomer = req.body;
        const { avatar } = req.files;

        // get customer
        const customer = await Customer.findById(id);

        // check if customer exists
        if (!customer) {
            return res.status(404).json({
                message: 'Customer not found',
            });
        }

        // update customer
        customer.set({
            ...customer.toObject(),
            avatar: avatar?.path || customer?.avatar || '',
            ...validatedCustomer,
        });

        // save customer
        await customer.save();

        // return response
        return res.status(200).json({
            message: 'Updated customer successfully',
            customer,
        });
    } catch (error) {
        return next(error);
    }
};
