/**
 * @file /controllers/api/payment-requests/create-payment-request.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 16 June, 2024
 */

// dependencies
const { PaymentRequest } = require('../../../models');

// export create payment request controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { _id } = req.user;
        const validatedData = req.body;
        const { attachment } = req.files;

        // create payment request
        const paymentsRequest = new PaymentRequest({
            ...validatedData,
            attachment: attachment?.path,
            customer: _id,
        });

        // save payment request
        await paymentsRequest.save();

        // return response
        return res.status(200).json({
            message: 'Created payment request successfully',
            paymentsRequest,
        });
    } catch (error) {
        return next(error);
    }
};
