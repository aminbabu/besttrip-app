/**
 * @file /controllers/settings/payments/get-payments-settings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 17 April 2024
 */

// dependencies
const { PaymentsSettings } = require('../../../models');

// export get payments settings controller
module.exports = async (req, res, next) => {
    try {
        // get payments settings
        const paymentsSettings = await PaymentsSettings.find();

        // return response
        return res.status(200).json({
            message: 'Fetched payments settings successfully',
            paymentsSettings,
        });
    } catch (error) {
        return next(error);
    }
};
