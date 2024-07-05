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
        const { id: customerId, balance, type } = req.body;

        // get customer's wallet
        const wallet = await Wallet.findById(customerId);

        // update wallet balance
        wallet.balance =
            type === 'top-up'
                ? wallet.balance + balance
                : wallet.balance - balance < 0
                  ? 0
                  : wallet.balance - balance;

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
