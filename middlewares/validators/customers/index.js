/**
 * @file /middlewares/validators/customers/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 April, 2024
 * @update_date 07 April, 2024
 */

// export all validators
module.exports = {
    validateCustomer: require('./validate-customer'),
    validateCustomerSelf: require('./validate-customer-self'),
};
