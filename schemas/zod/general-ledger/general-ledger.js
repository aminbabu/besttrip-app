/**
 * @file /schemas/zod/general-ledger/general-ledger.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 23 June, 2024
 * @update_date 23 June, 2024
 */

// dependencies
const { z } = require("zod");
const { isMongoId } = require("validator");
const moment = require("moment");

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
  })
  .strict();
