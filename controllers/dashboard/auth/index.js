/**
 * @file controllers/dashboard/auth/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 09 June, 2024
 */

// export auth view controllers
module.exports = {
    viewSignIn: require('./view-sign-in'),
    viewSignUp: require('./view-sign-up'),
    viewForgotPassword: require('./view-forgot-password'),
    viewResetPassword: require('./view-reset-password'),
    viewResendVerificationEmail: require('./view-resend-verification-email'),
    viewEmailVerification: require('./email-verification'),
    viewAccountActivation: require('./view-account-activation'),
    viewTwoStep: require('./view-two-step'),
};
