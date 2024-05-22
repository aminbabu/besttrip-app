/**
 * @file /controllers/api/settings/payments/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 20 April 2024
 */

// export payments controllers
module.exports = {
    getPayments: require('./get-payments'),
    getPayment: require('./get-payment'),
    createPayment: require('./create-payment'),
    updatePayment: require('./update-payment'),
    deletePayment: require('./delete-payment'),
};
