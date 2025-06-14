/**
 * @file /controllers/api/customers/update-customer-wallet.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 05 Jul, 2024
 * @update_date 05 Jul, 2024
 */

// dependencies
const { Wallet } = require('../../../models');

// export update customer wallet controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { balance, type, description } = req.body;
        const { id: customerId } = req.params;

        // get customer's wallet
        const wallet = await Wallet.findOne({ customer: customerId });

        // check if wallet exists
        if (!wallet) {
            return res.status(404).json({
                message: "Customer's wallet not found",
            });
        }

        // set wallet data
        wallet.set({
            balance: (wallet.balance =
                type === 'top-up'
                    ? wallet.balance + Number(balance)
                    : wallet.balance - Number(balance)),
            type: type,
            description: description,
        });

        // save wallet
        await wallet.save();

        // return response
        return res.status(200).json({
            message: 'Updated customer wallet successfully',
        });
    } catch (error) {
        return next(error);
    }
};
