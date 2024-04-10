/**
 * @file /middlewares/validators/users/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 08 April, 2024
 * @update_date 10 April, 2024
 */

// export all validators
module.exports = {
    validateCustomerId: require('./validate-user-id'),
    validateCustomer: require('./validate-user'),
    validateCustomerSelf: require('./validate-user-self'),
};
