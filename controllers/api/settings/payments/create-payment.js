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

        // Check if payments settings already exist
        const existingPaymentsSetting = await PaymentSettings.findOne({
            accountNumber: validatedData.accountNumber,
        });

        if (existingPaymentsSetting) {
            return res.status(409).json({
                message:
                    'Payments settings with this account number already exists',
            });
        }

        // Create payments settings
        const paymentsSetting = new PaymentSettings(validatedData);

        // Save payments settings
        await paymentsSetting.save();

        // Return response
        return res.status(201).json({
            message: 'Created payments settings successfully',
            paymentsSetting,
        });
    } catch (error) {
        return next(error);
    }
};
