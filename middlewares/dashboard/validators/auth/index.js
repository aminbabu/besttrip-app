/**
 * @file /middlewares/dashboard/validators/auth/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 04 June, 2024
 */

// export auth validators middlewares
module.exports = {
    validateRegister: require('./validate-register'),
    validateLogin: require('./validate-login'),
    validateForgotPassword: require('./validate-forgot-password'),
    validateResetPassword: require('./validate-reset-password'),
    validateSendVerificationEmail: require('./validate-send-verification-email'),
    validateVerifyEmail: require('./validate-verify-email'),
};
