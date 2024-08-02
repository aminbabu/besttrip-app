/**
 * @file /controllers/api/settings/payments/create-payments-settings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 19 April 2024
 */

// dependencies
const { PaymentSettings } = require('../../../../models');

// export create payments settings controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const validatedData = req.body;

        // get payments settings
        const existingPaymentsSetting = await PaymentSettings.findOne({
            accountNumber: validatedData.accountNumber,
        });

        // check if payments settings exist
        if (existingPaymentsSetting) {
            return res.status(200).json({
                message: 'Payments settings already exists',
            });
        }

        // create payments settings
        const paymentsSetting = new PaymentSettings(validatedData);

        // save payments settings
        await paymentsSetting.save();

        // return response
        return res.status(200).json({
            message: 'Created payments settings successfully',
            paymentsSetting,
        });
    } catch (error) {
        return next(error);
    }
};
