/**
 * @file /controllers/auth/users/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 22 May, 2024
 * @update_date 03 June, 2024
 */

// export all controllers
module.exports = {
    register: require('./register'),
    login: require('./login'),
    forgotPassword: require('./forgot-password'),
    resetPassword: require('./reset-password'),
    verifyEmail: require('./verify-email'),
    logout: require('./logout'),
};
