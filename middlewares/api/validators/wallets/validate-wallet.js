/**
 * @file /middlewares/api/validators/wallet/validate-wallet.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 24 June, 2024
 * @update_date 24 June, 2024
 */

// dependencies
const { walletSchema } = require("../../../../schemas/zod/wallets");
const { zodErrorHandler } = require("../../../../handlers/errors");

// export validate wallet middleware
module.exports = (req, res, next) => {
  // validate request params
  const { error, success } = walletSchema
    .omit({ id: true })
    .safeParse(req.params);

  // check for errors
  if (!success) {
    // return error response
    return zodErrorHandler(res, error);
  }

  // proceed to next middleware
  return next();
};
