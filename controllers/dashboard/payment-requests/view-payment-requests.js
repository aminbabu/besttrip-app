/**
 * @file controllers/dashboard/payment-requests/view-payment-requests.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 June, 2024
 * @update_date 22 June, 2024
 */

// dependencies
const moment = require('moment');
const { PaymentRequest } = require('../../../models');
const { currencyFormatter } = require('../../../utils');

// export payment requests view controller
module.exports = async (req, res) => {
    try {
        // get status from request params
        const { status } = req.params;

        // get payment requests by sorting descending
        let paymentRequests = await PaymentRequest.find({ status })
            .populate(
                'customer',
                '-password  -twoStepAuth -isVerified -loginHistory -createdAt -updatedAt'
            )
            .sort({
                createdAt: 'desc',
            });

        // format payment requests
        paymentRequests = paymentRequests.map((paymentRequest) => {
            const modifiedPaymentRequest = { ...paymentRequest.toObject() };

            modifiedPaymentRequest.amount = currencyFormatter(
                paymentRequest.amount
            );
            modifiedPaymentRequest.createdAt = moment(
                paymentRequest.createdAt
            ).format('DD MMM YYYY, h:mm a');

            return modifiedPaymentRequest;
        });

        // return render view
        return res.render('dashboard/payment-requests/', {
            title: 'Payment Requests',
            status,
            paymentRequests,
        });
    } catch (error) {
        return res.redirect('/dashboard/error/500');
    }
};
