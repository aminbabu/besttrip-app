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
        let paymentRequests = await PaymentRequest.aggregate([
            { $match: { status } },
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
                    'customer.avatar': 0,
                    'customer.wallet': 0,
                    'customer.dob': 0,
                    'customer.customerID': 0,
                    'customer.role:': 0,
                    'customer.status:': 0,
                },
            },
            { $sort: { createdAt: -1 } },
        ]);

        // format payment requests
        paymentRequests = paymentRequests.map((paymentRequest) => {
            paymentRequest.amount = currencyFormatter(paymentRequest.amount);
            paymentRequest.createdAt = moment(paymentRequest.createdAt).format(
                'DD MMM YYYY, h:mm a'
            );
            return paymentRequest;
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
