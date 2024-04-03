/**
 * @file /controllers/customers/update-customer-by-self.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 April 2024
 * @update_date 03 April 2024
 */

// dependencies
const { Customer } = require('../../models');
const { generateToken } = require('../../utils');

// update customer by self controller
const updateCustomerBySelf = async (req, res, next) => {
    try {
        // get customer id
        const { id } = req.params;

        // get the wallet object from the request body
        const { wallet } = req.body;

        // get customer
        const customer = await Customer.findById(id);
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
            ...req.body,
            wallet: {
                ...req.body.wallet,
                balance: customer.wallet.balance,
            },
        });

        // save customer
        await customer.save();

        // generate token
        const token = generateToken(req.user);

        // success response
        return res.status(200).json({
            message: 'Updated successfully',
            customer,
            token,
        });
    } catch (error) {
        return next(error);
    }
};

// export controller
module.exports = updateCustomerBySelf;
