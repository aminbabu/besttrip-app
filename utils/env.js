/**
 * @file /utils/env.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March 2024
 */

// dependencies
const dotenv = require("dotenv");

// configure dotenv
dotenv.config();

// export environment variables
module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  APP_NAME: process.env.APP_NAME,
  APP_URL: process.env.APP_URL,
  PORT: process.env.PORT,
  MONGODB_URI:
    this.NODE_ENV === "development"
      ? process.env.MONGODB_URI_DEV
      : process.env.MONGODB_URI_PROD,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  EMAIL_SERVICE: process.env.EMAIL_SERVICE,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USERNAME: process.env.EMAIL_USERNAME,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_FROM: process.env.EMAIL_FROM,
};
