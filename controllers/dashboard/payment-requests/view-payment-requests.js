/**
 * @file controllers/dashboard/payment-requests/view-payment-requests.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 June, 2024
 * @update_date 15 June, 2024
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

        // get payment requests
        let paymentRequests = await PaymentRequest.find({ status }).populate('customer');

        // format payment requests
        paymentRequests = paymentRequests.map((paymentRequest) => {
            const modifiedPaymentRequest = paymentRequest.toObject();

            modifiedPaymentRequest.amount = currencyFormatter(paymentRequest.amount);
            modifiedPaymentRequest.createdAt = moment(paymentRequest.createdAt).format(
                'DD MMM, YYYY hh:mm A'
            );

            return modifiedPaymentRequest;
        });

        // return render view
        return res.render(`dashboard/payment-requests/${status}`, {
            title: 'Payment Requests',
            user: req.user,
            paymentRequests,
        });
    } catch (error) {
        return res.redirect('/error/500');
    }
};
