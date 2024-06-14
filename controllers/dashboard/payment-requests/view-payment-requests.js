/**
 * @file controllers/dashboard/payment-requests/view-payment-requests.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 June, 2024
 * @update_date 14 June, 2024
 */

// dependencies
const { PaymentRequest } = require('../../../models');

// export view payment requests controller
module.exports = async (req, res, next) => {
    try {
        // get payment requests
        const paymentRequests = await PaymentRequest.find().populate('customer');

        // return render view
        return res.render('dashboard/payment-requests/', {
            title: 'Payment Requests',
            user: req.user,
            paymentRequests,
        });
    } catch (error) {
        return next(error);
    }
};
