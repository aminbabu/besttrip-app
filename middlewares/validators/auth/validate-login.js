/**
 * @file /middlewares/validators/validateLogin.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March 2024
 * @update_date 22 March 2024
 */

// dependencies
const { body } = require("express-validator");
const { expressValidator } = require("../../../handlers/errors");

// validate login
module.exports = [
  body("email").isEmail().withMessage("Email is not valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  expressValidator,
];
