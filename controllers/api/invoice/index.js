/**
 * @file controllers/api/invoice/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 23 June, 2021
 * @update_date 23 June, 2021
 */

// export general ledger controllers
module.exports = {
    getInvoiceForAdmin: require('./invoice-for-admin'),
    getInvoiceForCustomer: require('./invoice-for-customer'),
    getAllInvoicesForAdmin: require('./get-all-invoice-for-admin'),
    updatePartialPaymentTimeLimit: require('./update-partial-payment-time-limit'),
};
