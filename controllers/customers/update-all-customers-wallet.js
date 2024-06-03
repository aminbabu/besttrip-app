/**
 * @file /controllers/api/customers/update-all-customers-wallet.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 April, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const { Customer } = require('../../models');

// export update all customers wallet controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { wallet } = req.body;

        // get all customers
        const customers = await Customer.find();

        // check if customers exist
        if (!customers.length) {
            return res.status(404).json({
                message: 'No customers found',
            });
        }

        // update all customers wallet
        customers.forEach(async (c) => {
            // get customer
            const customer = { ...c.toObject() };

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
            c.set({
                ...customer,
                wallet: {
                    ...wallet,
                    balance: customer.wallet.balance,
                },
            });

            // save customer
            await c.save();
        });

        return res.status(200).json({
            message: 'Customers wallet updated successfully',
            customers,
        });
    } catch (error) {
        return next(error);
    }
};
