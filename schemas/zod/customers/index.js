/**
 * @file /schemas/zod/customers/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 20 Aug, 2024
 */

// export customer zod schemas
module.exports = {
    customerSchema: require('./customer'),
    updatePasswordSchema: require('./update-password.js'),
};
