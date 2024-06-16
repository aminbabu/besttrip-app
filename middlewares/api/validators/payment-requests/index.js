/**
 * @file /middlewares/api/validators/payment-requests/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 16 June, 2024
 */

// export payment requests validator middlewares
module.exports = {
    validatePaymentRequestId: require('./validate-payment-request-id'),
    validatePaymentRequest: require('./validate-payment-request'),
    validatePaymentRequestStatusNote: require('./validate-payment-request-status-note'),
    validatePaymentRequestsByStatus: require('./validate-payment-requests-by-status'),
    validatePaymentRequestAttachment: require('./validate-payment-request-attachment'),
};
