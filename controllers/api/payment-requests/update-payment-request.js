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
const mongoose = require('mongoose');

// export update payment request controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;
        const { status, note } = req.body;

        // get payment request using aggregate
        const paymentRequests = await PaymentRequest.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: 'customers',
                    localField: 'customer',
                    foreignField: '_id',
                    as: 'customer',
                },
            },
            { $unwind: '$customer' },
            {
                $project: {
                    'customer.password': 0,
                    'customer.twoStepAuth': 0,
                    'customer.isVerified': 0,
                    'customer.loginHistory': 0,
                    'customer.createdAt': 0,
                    'customer.updatedAt': 0,
                },
            },
        ]);

        const paymentRequest = paymentRequests[0];

        // check if payment request exist
        if (!paymentRequest) {
            return res.status(404).json({
                message: 'Payments request not found',
            });
        }

        // check if customer exists
        if (!paymentRequest.customer) {
            return res.status(404).json({
                message: 'Customer not found',
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
        paymentRequest.status = status;
        paymentRequest.note = note || paymentRequest.note;

        // save payment request
        await PaymentRequest.findByIdAndUpdate(id, paymentRequest);

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
