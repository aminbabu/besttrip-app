/**
 * @file /middlewares/api/validators/settings/payments/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 17 April, 2024
 */

// export payments settings validator middlewares
module.exports = {
    validatePaymentStatus: require('./validate-payment-status'),
    validatePaymentIds: require('./validate-payment-ids'),
    validatePaymentId: require('./validate-payment-id'),
    validatePayment: require('./validate-payment'),
};
