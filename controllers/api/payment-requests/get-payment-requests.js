/**
 * @file /controllers/api/payment-requests/get-payment-requests.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 20 April, 2024
 */

// dependencies
const { PaymentRequest } = require('../../../models');

// export get payment requests controller
module.exports = async (req, res, next) => {
    try {
        let paymentRequests;

        // Check if the user is authenticated and has a role
        if (req.user) {
            if (req.user.role === 'customer') {
                // Fetch payment requests only for the authenticated customer
                paymentRequests = await PaymentRequest.find({
                    customer: req.user._id,
                }).populate(
                    'customer',
                    '-password  -twoStepAuth -isVerified -loginHistory -createdAt -updatedAt'
                );
            } else {
                // Fetch all payment requests if the user is not a customer
                paymentRequests = await PaymentRequest.find().populate(
                    'customer',
                    '-password  -twoStepAuth -isVerified -loginHistory -createdAt -updatedAt'
                );
            }
        }

        // return response
        return res.status(200).json({
            message: 'Fetched payment requests successfully',
            paymentRequests,
        });
    } catch (error) {
        return next(error);
    }
};
