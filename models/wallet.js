/**
 * @file /models/wallet.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 24 June, 2024
 * @update_date 05 Jul, 2024
 */

// dependencies
const { model } = require('mongoose');
const { walletSchema } = require('../schemas/mongoose');

// manage wallet before saving
walletSchema.pre('save', async function (next) {
    try {
        // check if customer is new
        if (!this.isNew) {
            return next();
        }

        return next();
    } catch (error) {
        return next(error);
    }
});

// export model
module.exports = model('Wallet', walletSchema);
