/**
 * @file /controllers/payment-requests/create-payment-request.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 10 May, 2024
 */

// dependencies
const { PaymentRequest } = require('../../../models');

// export create payment request controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { _id } = req.user;
        const validatedData = req.body;

        // create payment request
        const paymentsRequest = new PaymentRequest({
            ...validatedData,
            customer: _id,
        });

        // save payment request
        await paymentsRequest.save();

        // return response
        return res.status(201).json({
            message: 'Created payment request successfully',
            paymentsRequest,
        });
    } catch (error) {
        return next(error);
    }
};
