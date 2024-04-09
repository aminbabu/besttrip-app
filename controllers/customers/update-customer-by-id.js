/**
 * @file /controllers/customers/update-customer-by-id.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 29 March, 2024
 * @update_date 08 April, 2024
 */

// dependencies
const { matchedData } = require('express-validator');
const { Customer } = require('../../models');

// export update customer by mongo id controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const body = matchedData(req);

        // get customer
        const customer = await Customer.findById(body.id);

        // check if customer exists
        if (!customer) {
            return res.status(404).json({
                message: 'Customer not found',
            });
        }

        // calculate wallet balance based on transaction type
        if (body.wallet) {
            switch (body.wallet.type) {
                case 'top-up':
                    customer.wallet.balance += body.wallet.balance;
                    break;
                case 'deduct':
                    customer.wallet.balance -= body.wallet.balance;
                    break;
                default:
                    break;
            }
        }

        // update customer
        customer.set({
            ...customer,
            ...body,
            wallet: {
                ...body.wallet,
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
