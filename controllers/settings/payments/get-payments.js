/**
 * @file /controllers/api/settings/payments/get-payments-settings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 19 April 2024
 */

// dependencies
const { PaymentSettings } = require('../../../models');

// export get payments settings controller
module.exports = async (req, res, next) => {
    try {
        // get payments settings
        const paymentSettings = await PaymentSettings.find();

        // return response
        return res.status(200).json({
            message: 'Fetched payments settings successfully',
            paymentSettings,
        });
    } catch (error) {
        return next(error);
    }
};
