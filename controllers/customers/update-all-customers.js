/**
 * @file /controllers/customers/update-all-customers.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 April, 2024
 * @update_date 04 April, 2024
 */

// dependencies
const { Customer } = require('../../models');
const { generateToken } = require('../../utils');

// export update all customers
module.exports = async (req, res, next) => {
    try {
        // get the wallet object from the request body
        const { wallet } = req.body;

        // get all customers
        const customers = await Customer.find();

        // check if customers exist
        if (!customers.length) {
            return res.status(404).json({
                message: 'Customers not found',
            });
        }

        // update all customers
        customers.forEach(async (customerItem) => {
            // get customer
            const customer = customerItem;

            // calculate wallet balance based on transaction type
            if (wallet) {
                switch (wallet.type) {
                    case 'top-up':
                        customer.wallet.balance += wallet.balance;
                        break;
                    case 'deduct':
                        customer.wallet.balance -= wallet.balance;
                        break;
                    default:
                        break;
                }
            }

            // update customer
            customer.set({
                ...customer.toObject(),
                ...req.body,
                wallet: {
                    ...req.body.wallet,
                    balance: customer.wallet.balance,
                },
            });

            // save customer
            await customer.save();
        });

        // generate token
        const token = generateToken(req.user);

        return res.status(200).json({
            message: 'Customers updated successfully',
            customers,
            token,
        });
    } catch (error) {
        return next(error);
    }
};
