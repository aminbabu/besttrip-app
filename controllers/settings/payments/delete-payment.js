/**
 * @file /controllers/settings/payments/delete-payments-settings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 17 April 2024
 */

// dependencies
const { PaymentsSettings } = require('../../../models');

// export delete payments settings controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.body;

        // get payments settings
        const paymentsSetting = await PaymentsSettings.findById(id);

        // check if payments settings exist
        if (!paymentsSetting) {
            return res.status(404).json({
                message: 'Payments settings not found',
            });
        }

        // delete payments settings
        await paymentsSetting.deleteOne();

        // return response
        return res.status(200).json({
            message: 'Deleted payments settings successfully',
        });
    } catch (error) {
        return next(error);
    }
};
