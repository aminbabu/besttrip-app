/**
 * @file /schemas/zod/wallet/general-ledger.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 24 June, 2024
 * @update_date 24 June, 2024
 */

// dependencies
const { z } = require("zod");
const { isMongoId } = require("validator");
const moment = require("moment");
const { WALLET_TRANSACTION_TYPES } = require("../../../constants");

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
    user: z
      .string({
        required_error: "User is required",
        invalid_type_error: "Please provide a valid user",
      })
      .refine((user) => isMongoId(user), {
        message: "Please provide a valid user",
      })
      .optional(),
    customer: z
      .string({
        required_error: "Customer is required",
        invalid_type_error: "Please provide a valid customer",
      })
      .refine((customer) => isMongoId(customer), {
        message: "Please provide a valid customer",
      })
      .optional(),
    balance: z
      .string({
        required_error: "Balance is required",
        invalid_type_error: "Please provide a valid balance",
      })
      .refine((balance) => Number(balance) >= 0, {
        message: "Please provide a valid balance",
      }),
    type: z
      .string({
        required_error: "Type is required",
        invalid_type_error: "Please provide a valid type",
      })
      .refine((type) => WALLET_TRANSACTION_TYPES.includes(type), {
        message: "Please provide a valid type",
      }),
    description: z
      .string({
        required_error: "Description is required",
        invalid_type_error: "Please provide a valid description",
      })
      .min(3, {
        message: "Description must be at least 3 characters",
      })
      .optional(),
  })
  .strict();
