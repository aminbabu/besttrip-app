/**
 * @file /controllers/api/auth/users/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 16 June, 2024
 */

// export all controllers
module.exports = {
    register: require('./register'),
    login: require('./login'),
    forgotPassword: require('./forgot-password'),
    resetPassword: require('./reset-password'),
    resendVerificationEmail: require('./resend-verification-email'),
    verifyEmail: require('./verify-email'),
    accountActivation: require('./account-activation'),
    twoStepAuth: require('./two-step-auth'),
    twoStepValidateCode: require('./two-step-validate-code'),
};
