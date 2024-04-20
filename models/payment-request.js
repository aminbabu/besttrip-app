/**
 * @file /models/payment-request.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 20 April, 2024
 */

// dependencies
const { model } = require('mongoose');
const { paymentRequestSchema } = require('../schemas/mongoose');

// export payment request model
module.exports = model('PaymentRequest', paymentRequestSchema);
