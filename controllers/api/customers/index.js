/**
 * @file /controllers/api/customers/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 29 March, 2024
 * @update_date 05 Jul, 2024
 */

// export all controllers
module.exports = {
    getAllCustomers: require('./get-all-customers'),
    getCustomer: require('./get-customer'),
    createCustomer: require('./create-customer'),
    updateAllCustomersWallet: require('./update-all-customers-wallet'),
    updateCustomer: require('./update-customer'),
    updateCustomerBySelf: require('./update-customer-by-self'),
    updateCustomerWallet: require('./update-customer-wallet'),
    deleteCustomer: require('./delete-customer'),
    deleteCustomerBySelf: require('./delete-customer-by-self'),
};
