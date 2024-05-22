/**
 * @file /controllers/payment-requests/get-payment-request.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 20 April, 2024
 */

// dependencies
const { PaymentRequest } = require('../../models');

// export get payment request controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;

        // get payment request
        const paymentRequest = await PaymentRequest.findById(id).populate('customer');

        // check if payment request exists
        if (!paymentRequest) {
            return res.status(404).json({
                message: 'Payment request not found',
            });
        }

        // return response
        return res.status(200).json({
            message: 'Fetched payment request successfully',
            paymentRequest,
        });
    } catch (error) {
        return next(error);
    }
};
