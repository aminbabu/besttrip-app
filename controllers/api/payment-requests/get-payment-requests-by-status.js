/**
 * @file /controllers/api/payment-requests/get-payment-requests-by-status.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 June, 2024
 * @update_date 14 June, 2024
 */

// dependencies
const { PaymentRequest } = require('../../../models');

// export get payment requests by status controller
module.exports = async (req, res, next) => {
    try {
        // get status from request
        const { status } = req.params;

        // get payment requests
        const paymentRequests = await PaymentRequest.find({ status }).populate(
            'customer',
            '-password  -twoStepAuth -isVerified -loginHistory -createdAt -updatedAt'
        );

        // return response
        return res.status(200).json({
            message: 'Fetched payment requests by status successfully',
            paymentRequests,
        });
    } catch (error) {
        return next(error);
    }
};
