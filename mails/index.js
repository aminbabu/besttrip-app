/**
 * @file /mails/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 22 March, 2024
 */

// export all mails
module.exports = {
    welcome: require('./welcome'),
    forgotPassword: require('./forgot-password'),
    verifyEmail: require('./verify-email'),
    confirmEmailVerification: require('./confirm-email-verification'),
    sendPasswordResetConfirmation: require('./send-password-reset-confirmation'),
};
