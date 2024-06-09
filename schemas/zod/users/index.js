/**
 * @file /schemas/zod/users/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 09 June, 2024
 */

// export user zod schemas
module.exports = {
    userSchema: require('./user'),
    updatePasswordSchema: require('./update-password'),
};
