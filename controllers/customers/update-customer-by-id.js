/**
 * @file /controllers/customers/update-customer-by-id.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 29 March, 2024
 * @update_date 12 April, 2024
 */

// dependencies
const { matchedData } = require('express-validator');
const { Customer } = require('../../models');

// export update customer by mongo id controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const validatedCustomer = matchedData(req);
        const { avatar } = req.body;

        // get customer
        const customer = await Customer.findById(validatedCustomer.id);

        // check if customer exists
        if (!customer) {
            return res.status(404).json({
                message: 'Customer not found',
            });
        }

        // get duplicate customer by email or phone, but not the same customer
        const duplicateCustomer = await Customer.findOne({
            $or: [{ email: validatedCustomer.email }, { phone: validatedCustomer.phone }],
            _id: { $ne: validatedCustomer.id },
        });

        // check if duplicate customer exists
        if (duplicateCustomer) {
            return res.status(400).json({
                message: 'Customer already exists with this email',
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
            avatar,
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
