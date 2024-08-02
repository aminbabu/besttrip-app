/**
 * @file /controllers/api/wallets/createWallet.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 24 June, 2024
 * @update_date 24 June, 2024
 */

// dependencies
const { Wallet } = require('../../../models');

// export create wallet controller
module.exports = async (req, res, next) => {
    try {
        // get validated Data
        const { customer, user, balance, type, description } = req.body;

        // create wallet
        const wallet = new Wallet({
            customer,
            user,
            balance,
            type,
            description,
        });

        // save wallet
        await wallet.save();

        // return response
        return res.status(200).json({
            message: 'Created wallet successfully',
            wallet,
        });
    } catch (error) {
        next(error);
    }
};
