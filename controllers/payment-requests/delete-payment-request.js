/**
 * @file /controllers/api/payment-requests/delete-payment-request.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 20 April, 2024
 */

// dependencies
const { PaymentRequest } = require('../../models');

// export delete payment request controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;

        // get payment request
        const paymentRequest = await PaymentRequest.findById(id);

        // check if payment request exist
        if (!paymentRequest) {
            return res.status(404).json({
                message: 'Payments request not found',
            });
        }

        // delete payment request
        await paymentRequest.deleteOne();

        // return response
        return res.status(200).json({
            message: 'Deleted payment request successfully',
            paymentRequest,
        });
    } catch (error) {
        return next(error);
    }
};
