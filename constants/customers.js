/**
 * @file /constants/customers.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 April, 2024
 * @update_date 20 April, 2024
 */

// customer roles
const CUSTOMER_ROLES = ['customer'];

// customer wallet transaction types
const CUSTOMER_WALLET_TRANSACTION_TYPES = ['top-up', 'deduct'];

// customer status
const CUSTOMER_STATUS = ['active', 'disabled'];

// export constants
module.exports = {
    CUSTOMER_WALLET_TRANSACTION_TYPES,
    CUSTOMER_STATUS,
    CUSTOMER_ROLES,
};
