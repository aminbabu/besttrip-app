/**
 * @file /middlewares/api/validators/login-history/validate-login-history-id.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 22 June, 2024
 * @update_date 22 June, 2024
 */

// dependencies
const { loginHistorySchema } = require("../../../../schemas/zod/login-history");
const { zodErrorHandler } = require("../../../../handlers/errors");

// export login history id validator
module.exports = (req, res, next) => {
  // validate request body
  const { error, success } = loginHistoryScheme
    .pick({ id: true })
    .safeParse(req.params);

  // check for errors
  if (!success) {
    // return error response
    return zodErrorHandler(res, error);
  }

  // proceed to next middleware
  return next();
};
