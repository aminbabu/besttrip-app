/**
 * @file /middlewares/validators/settings/payments/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 17 April, 2024
 */

// export payments settings validator middlewares
module.exports = {
    validatePaymentId: require('./validate-payment-id'),
    validatePayment: require('./validate-payment'),
};
