/**
 * @file /controllers/api/payment-requests/update-payment-request.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 16 June, 2024
 */

// dependencies
const { PaymentRequest, Customer } = require('../../../models');

// export update payment request controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;
        const { status, note } = req.body;

        // get payment request
        const paymentRequest = await PaymentRequest.findById(id).populate(
            'customer',
            '-password  -twoStepAuth -isVerified -loginHistory -createdAt -updatedAt'
        );

        // check if payment request exist
        if (!paymentRequest) {
            return res.status(404).json({
                message: 'Payments request not found',
            });
        }

        // get the customer
        const customer = await Customer.findById(paymentRequest.customer._id);

        // check if payment request is approved
        if (paymentRequest.status !== 'approved' && status === 'approved') {
            // update customer balance
            paymentRequest.customer.wallet.balance += paymentRequest.amount;
            customer.wallet.balance += paymentRequest.amount;
        }

        // check if payment request is rejected
        if (paymentRequest.status === 'approved' && status === 'rejected') {
            // update customer balance
            paymentRequest.customer.wallet.balance -= paymentRequest.amount;
            customer.wallet.balance -= paymentRequest.amount;
        }

        // update payment request
        paymentRequest.set({
            status,
            note: note || paymentRequest?.note,
        });

        // save payment request
        await paymentRequest.save();

        // save customer
        await customer.save();

        // return response
        return res.status(200).json({
            message: 'Updated payment request status successfully',
            paymentRequest,
        });
    } catch (error) {
        return next(error);
    }
};
