/**
 * @file /controllers/api/customers/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 29 March, 2024
 * @update_date 19 April, 2024
 */

// export all controllers
module.exports = {
    getAllCustomers: require('./get-all-customers'),
    getCustomer: require('./get-customer'),
    updateAllCustomersWallet: require('./update-all-customers-wallet'),
    updateCustomer: require('./update-customer'),
    updateCustomerBySelf: require('./update-customer-by-self'),
    deleteCustomer: require('./delete-customer'),
    deleteCustomerBySelf: require('./delete-customer-by-self'),
};
