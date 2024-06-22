/**
 * @file /middlewares/api/validators/login-history/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 22 June, 2024
 * @update_date 22 June, 2024
 */

// export all validators
module.exports = {
  validateLoginHistoryId: require("./validate-login-history-id"),
  validateLoginHistory: require("./validate-login-history"),
};
