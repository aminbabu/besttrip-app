/**
 * @file /controllers/api/auth/users/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 03 June, 2024
 */

// export all controllers
module.exports = {
    viewRegister: require('./view-register'),
    register: require('./register'),
    viewLogin: require('./view-login'),
    login: require('./login'),
    viewForgotPassword: require('./view-forgot-password'),
    forgotPassword: require('./forgot-password'),
    viewResetPassword: require('./view-reset-password'),
    resetPassword: require('./reset-password'),
    viewResendVerificationEmail: require('./view-resend-verification-email'),
    resendVerificationEmail: require('./resend-verification-email'),
    viewVerifyEmail: require('./view-verify-email'),
    verifyEmail: require('./verify-email'),
};
