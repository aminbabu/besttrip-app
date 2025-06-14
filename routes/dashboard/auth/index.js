/**
 * @file routes/auth/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 09 June, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    viewSignIn,
    viewSignUp,
    viewForgotPassword,
    viewResetPassword,
    viewResendVerificationEmail,
    viewEmailVerification,
    viewAccountActivation,
    viewTwoStep,
} = require('../../../controllers/dashboard/auth');

// middlewares
const { isNotAuthorized } = require('../../../middlewares/dashboard/auth');

/**
 * @description - isNotAuthorized middleware
 * @param {function} middleware - ['isNotAuthorized']
 * @returns {object} - router
 * @access public - ['all']
 * @method USE
 */
router.use(isNotAuthorized);

/**
 * @description - login view route
 * @param {string} path - '/auth/login'
 * @param {function} controller - ['viewSignIn']
 * @returns {object} - router
 * @access public - ['all']
 * @method GET
 */
router.get('/login', viewSignIn);

/**
 * @description - sign-in view route
 * @param {string} path - '/auth/sign-in'
 * @param {function} controller - ['viewSignIn']
 * @returns {object} - router
 * @access public - ['all']
 * @method GET
 */
router.get('/sign-in', viewSignIn);

/**
 * @description - register view route
 * @param {string} path - '/auth/register'
 * @param {function} controller - ['viewSignUp']
 * @returns {object} - router
 * @access public - ['all']
 * @method GET
 */
router.get('/register', viewSignUp);

/**
 * @description - sign-up view route
 * @param {string} path - '/auth/sign-up'
 * @param {function} controller - ['viewSignUp']
 * @returns {object} - router
 * @access public - ['all']
 * @method GET
 */
router.get('/sign-up', viewSignUp);

/**
 * @description - forgot-password view route
 * @param {string} path - '/auth/forgot-password'
 * @param {function} controller - ['viewForgotPassword']
 * @returns {object} - router
 * @access public - ['all']
 * @method GET
 */
router.get('/forgot-password', viewForgotPassword);

/**
 * @description - reset-password view route
 * @param {string} path - '/auth/reset-password'
 * @param {function} controller - ['viewResetPassword']
 * @returns {object} - router
 * @access public - ['all']
 * @method GET
 */
router.get('/reset-password', viewResetPassword);

/**
 * @description - resend-verification view route
 * @param {string} path - '/resend-verification'
 * @param {function} controller - ['viewResendVerificationEmail']
 * @returns {object} - router
 * @access public - ['all']
 * @method GET
 */
router.get('/resend-verification-email', viewResendVerificationEmail);

/**
 * @description - verify-email view route
 * @param {string} path - '/auth/verify-email'
 * @param {function} controller - ['viewEmailVerification']
 * @returns {object} - router
 * @access public - ['all']
 * @method GET
 */
router.get('/verify-email', viewEmailVerification);

/**
 * @description - account-activation view route
 * @param {string} path - '/auth/account-activation'
 * @param {function} controller - ['viewAccountActivation']
 * @returns {object} - router
 * @access public - ['all']
 * @method GET
 */
router.get('/account-activation', viewAccountActivation);

/**
 * @description - two-step view route
 * @param {string} path - '/auth/two-factor'
 * @param {function} controller - ['viewTwoStep']
 * @returns {object} - router
 * @access public - ['all']
 * @method GET
 */
router.get('/two-factor', viewTwoStep);

// export router
module.exports = router;
