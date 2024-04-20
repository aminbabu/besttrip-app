/**
 * @file /controllers/payment-requests/get-payment-requests.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 20 April 2024
 */

// dependencies
const { PaymentRequest } = require('../../models');

// export get payment requests controller
module.exports = async (req, res, next) => {
    try {
        // get payment requests
        const paymentRequests = await PaymentRequest.find().populate('customer');

        // return response
        return res.status(200).json({
            message: 'Fetched payment requests successfully',
            paymentRequests,
        });
    } catch (error) {
        return next(error);
    }
};
