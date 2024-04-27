/**
 * @file /controllers/payment-requests/update-payment-request.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 27 April 2024
 */

// dependencies
const { PaymentRequest } = require('../../models');

// export update payment request controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;
        const validatedData = req.body;

        // get payment request
        const paymentRequest = await PaymentRequest.findById(id).populate('customer');

        // check if payment request exist
        if (!paymentRequest) {
            return res.status(404).json({
                message: 'Payments request not found',
            });
        }

        // check if payment request is approved
        if (paymentRequest.status !== 'approved' && validatedData.status === 'approved') {
            // update customer balance
            paymentRequest.customer.wallet.balance += paymentRequest.amount;
        }

        // check if payment request is rejected
        if (paymentRequest.status === 'approved' && validatedData.status === 'rejected') {
            // update customer balance
            paymentRequest.customer.wallet.balance -= paymentRequest.amount;
        }

        // update payment request
        paymentRequest.set(validatedData);

        // save payment request
        await paymentRequest.save();

        // return response
        return res.status(200).json({
            message: 'Updated payment request successfully',
            paymentRequest,
        });
    } catch (error) {
        return next(error);
    }
};
