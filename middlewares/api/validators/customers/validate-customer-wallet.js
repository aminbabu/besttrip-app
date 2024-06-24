/**
 * @file /middlewares/api/validators/customers/validate-customer-wallet.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 07 April, 2024
 * @update_date 24 June, 2024
 */

// dependencies
const { walletSchema } = require("../../../../schemas/zod/wallets");
const { zodErrorHandler } = require("../../../../handlers/errors");

// export validate customer wallet middleware
module.exports = (req, res, next) => {
  // validate request body
  const { error, success } = walletSchema
    .omit({ id: true, user: true, customer: true })
    .required()
    .safeParse(req.body);

  // check for errors
  if (!success) {
    // return error response
    return zodErrorHandler(res, error);
  }

  // proceed to next middleware
  return next();
};
