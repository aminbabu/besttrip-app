/**
 * @file /schemas/zod/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 14 April, 2024
 */

// export all zod schemas
module.exports = {
    // auth
    loginSchema: require('./auth/login'),

    // customers
    customerSchema: require('./customers/customer'),
};
