/**
 * @file /models/payment-request.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 16 June, 2024
 */

// dependencies
const { model } = require('mongoose');
const moment = require('moment');
const { paymentRequestSchema } = require('../schemas/mongoose');

// generate reference id before saving
paymentRequestSchema.pre('save', async function (next) {
    try {
        // check if reference is new
        if (!this.isNew) {
            return next();
        }

        // Get the last reference ID if any
        const lastPaymentRequest = await this.constructor.findOne(
            {},
            {},
            { sort: { createdAt: -1 } }
        );

        // get count from the last reference ID if any or set to 0
        let count = lastPaymentRequest ? parseInt(lastPaymentRequest.refId.slice(11), 10) : 0;

        // check pad count with 0 if less than 4 digits and increment by 1
        count = count > 9999 ? count + 1 : (count + 1).toString().padStart(4, '0');

        // reference ID based on date (YYYYMMDD) and count (0001, 0002, ...) with prefix 'DEP'
        this.refId = `DEP${moment().format('YYYYMMDD')}${count}`;

        return next();
    } catch (error) {
        return next(error);
    }
});

// export payment request model
module.exports = model('PaymentRequest', paymentRequestSchema);
