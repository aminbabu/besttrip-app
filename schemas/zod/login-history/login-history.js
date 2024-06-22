/**
 * @file /schemas/zod/login-history/login-history.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 22 June, 2024
 * @update_date 22 June, 2024
 */

// dependencies
const { z } = require("zod");
const { isMongoId } = require("validator");
const moment = require("moment");
const { LOGIN_HISTORY_STATUS } = require("../../../constants");

// export payment settings schema
module.exports = z
  .object({
    id: z
      .string({
        required_error: "Id is required",
        invalid_type_error: "Please provide a valid id",
      })
      .refine((id) => isMongoId(id), {
        message: "Please provide a valid id",
      }),
    status: z
      .string({
        required_error: "Status is required",
        invalid_type_error: "Status should be a string",
      })
      .refine((status) => LOGIN_HISTORY_STATUS.includes(status), {
        message: `Status should be one of ${LOGIN_HISTORY_STATUS.join(", ")}`,
      })
      .optional(),
    lastLogin: z
      .string({
        required_error: "Last login is required",
        invalid_type_error: "Last login should be a date",
      })
      .refine((lastLogin) => moment(lastLogin).isValid(), {
        message: "Please provide a valid date",
      })
      .optional(),
    userAgent: z
      .string({
        required_error: "User agent is required",
        invalid_type_error: "User agent should be a string",
      })
      .optional(),
    ipAddress: z
      .string({
        required_error: "IP address is required",
        invalid_type_error: "IP address should be a string",
      })
      .optional(),
    location: z
      .object({
        city: z
          .string({
            required_error: "City is required",
            invalid_type_error: "City should be a string",
          })
          .optional(),
        region: z
          .string({
            required_error: "Region is required",
            invalid_type_error: "Region should be a string",
          })
          .optional(),
        country: z
          .string({
            required_error: "Country is required",
            invalid_type_error: "Country should be a string",
          })
          .optional(),
      })
      .optional(),
  })
  .strict();
