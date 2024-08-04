/**
 * @file /controllers/api/settings/payments/delete-payments-settings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 Jul, 2024
 * @update_date 17 Jul, 2024
 */

// dependencies
const { PaymentSettings } = require('../../../../models');

// export update payment status status controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;
        const { status } = req.body;

        // get payments settings
        const paymentsSetting = await PaymentSettings.findById(id);

        // check if payments settings exist
        if (!paymentsSetting) {
            return res.status(200).json({
                message: 'Payments settings not found',
            });
        }

        // update payment status
        paymentsSetting.set({ status });

        // save payment status
        await paymentsSetting.save();

        // send response
        return res.status(200).send({
            message: 'Updated payment status successfully',
            paymentsSetting,
        });
    } catch (error) {
        return next(error);
    }
};
