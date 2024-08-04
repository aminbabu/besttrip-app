/**
 * @file /controllers/api/customers/update-customer-by-id.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 29 March, 2024
 * @update_date 19 April, 2024
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
            return res.status(200).json({
                message: 'Customer not found',
            });
        }

        // calculate wallet balance based on transaction type
        if (validatedCustomer.wallet) {
            switch (validatedCustomer.wallet.type) {
                case 'top-up':
                    customer.wallet.balance += validatedCustomer.wallet.balance;
                    break;
                case 'deduct':
                    customer.wallet.balance -= validatedCustomer.wallet.balance;
                    break;
                default:
                    break;
            }
        }

        // update customer
        customer.set({
            ...customer.toObject(),
            avatar: avatar?.path || customer.avatar,
            ...validatedCustomer,
            wallet: {
                ...validatedCustomer.wallet,
                balance: customer.wallet.balance,
            },
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
