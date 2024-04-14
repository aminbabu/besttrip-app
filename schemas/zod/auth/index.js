/**
 * @file /schemas/zod/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 14 April, 2024
 */

// export auth zod schemas
module.exports = {
    loginSchema: require('./login'),
    registerSchema: require('./register'),
    forgotPasswordSchema: require('./forgot-password'),
    resetPasswordSchema: require('./reset-password'),
};
