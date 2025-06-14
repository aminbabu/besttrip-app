/**
 * @file /controllers/api/settings/payments/delete-many-payments.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 19 April 2024
 */

// dependencies
const { PaymentSettings } = require('../../../../models');

// export delete payments settings controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { ids } = req.body;

        // get payments settings
        const paymentsSetting = await PaymentSettings.find({
            _id: { $in: ids },
        });

        // check if any payment settings not found
        if (paymentsSetting.length === 0) {
            return res.status(404).send({
                message: 'No payments settings found with the provided IDs',
            });
        }

        // delete payments settings
        await PaymentSettings.deleteMany({ _id: { $in: ids } });

        // return response
        return res.status(200).json({
            message: 'Deleted payments settings successfully',
            paymentsSetting,
        });
    } catch (error) {
        return next(error);
    }
};
