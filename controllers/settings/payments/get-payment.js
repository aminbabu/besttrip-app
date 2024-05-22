/**
 * @file /controllers/settings/payments/get-payments-settings-by-id.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 19 April 2024
 */

// dependencies
const { PaymentSettings } = require('../../../models');

// export get payments settings by id controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;

        // get payments settings
        const paymentsSetting = await PaymentSettings.findById(id);

        // check if payments settings exist
        if (!paymentsSetting) {
            return res.status(404).json({
                message: 'Payments settings not found',
            });
        }

        // return response
        return res.status(200).json({
            message: 'Fetched payments settings successfully',
            paymentsSetting,
        });
    } catch (error) {
        return next(error);
    }
};
