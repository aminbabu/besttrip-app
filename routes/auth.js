/**
 * @file /routes/auth.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March 2024
 */

// dependencies
const express = require("express");
const router = express.Router();

// controllers
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyEmail,
  sendVerificationEmail,
} = require("../controllers/auth");

// middlewares
const { auth } = require("../middlewares/validators/");
const { isVerified, isAuthorized } = require("../middlewares/auth");

/**
 * @description register a new user
 * @param {string} path - /auth/register
 * @param {function} middleware - ['validateRegister']
 * @param {function} controller - ['register']
 * @returns {object} - router
 * @access public
 * @method POST
 * @example ['/auth/register', '/auth/register?redirect=/check-email']
 */
router.post("/register", auth.validateRegister, register);

/**
 * @description login a user
 * @param {string} path - /auth/login
 * @param {function} middleware - ['validateLogin']
 * @param {function} controller - ['login']
 * @returns {object} - router
 * @access public
 * @method POST
 * @example ['/auth/login', '/auth/login?redirect=/dashboard']
 */
router.post("/login", auth.validateLogin, isVerified, login);

/**
 * @description forgot password
 * @param {string} path - /auth/forgot-password
 * @param {function} middleware - ['validateForgotPassword']
 * @param {function} controller - ['forgotPassword']
 * @returns {object} - router
 * @access public
 * @method POST
 * @example ['/auth/forgot-password', '/auth/forgot-password?redirect=/check-email']
 */
router.post("/forgot-password", auth.validateForgotPassword, forgotPassword);

/**
 * @description reset password
 * @param {string} path - /auth/reset-password
 * @param {function} middleware - ['validateResetPassword']
 * @param {function} controller - ['resetPassword']
 * @returns {object} - router
 * @access public
 * @method POST
 * @example ['/auth/reset-password?token=jwt-token', '/auth/reset-password?redirect=/dashboard']
 */
router.post("/reset-password", auth.validateResetPassword, resetPassword);

/**
 * @description send verification email
 * @param {string} path - /auth/send-verification-email
 * @param {function} middleware - ['validateSendVerificationEmail']
 * @param {function} controller - ['sendVerificationEmail']
 * @returns {object} - router
 * @access public
 * @method POST
 * @example ['/auth/send-verification-email', '/auth/send-verification-email?redirect=/check-email']
 */
router.post(
  "/send-verification-email",
  auth.validateSendVerificationEmail,
  isAuthorized,
  sendVerificationEmail
);

/**
 * @description verify email
 * @param {string} path - /auth/verify-email
 * @param {function} middleware - ['validateVerifyEmail']
 * @param {function} controller - ['verifyEmail']
 * @returns {object} - router
 * @access public
 * @method GET
 * @example ['/auth/verify-email?token=jwt-token', '/auth/verify-email?redirect=/dashboard]
 */
router.get("/verify-email", auth.validateVerifyEmail, verifyEmail);

// export
module.exports = router;
