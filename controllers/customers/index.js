/**
 * @file /controllers/customers/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 29 March, 2024
 * @update_date 29 March, 2024
 */

// export all controllers
module.exports = {
    getAllCustomers: require('./get-all-customers'),
    getCustomerById: require('./get-customer-by-id'),
    updateAllCustomersWallet: require('./update-all-customers-wallet'),
    updateCustomerById: require('./update-customer-by-id'),
    deleteCustomerById: require('./delete-customer-by-id'),
    updateCustomerBySelf: require('./update-customer-by-self'),
};
