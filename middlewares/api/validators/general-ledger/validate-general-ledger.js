/**
 * @file /middlewares/api/validators/general-ledger/validate-general-ledger.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 23 June, 2024
 * @update_date 23 June, 2024
 */

// dependencies
const {
  generalLedgerSchema,
} = require("../../../../schemas/zod/general-ledger");
const { zodErrorHandler } = require("../../../../handlers/errors");

// export validate general ledger middleware
module.exports = (req, res, next) => {
  // validate request body
  const { error, success } = generalLedgerSchema
    .omit({ id: true })
    .safeParse(req.body);

  // check for errors
  if (!success) {
    // return error response
    return zodErrorHandler(res, error);
  }

  // proceed to next middleware
  return next();
};
