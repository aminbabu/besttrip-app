/**
 * @file /middlewares/api/validators/general-ledger/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 23 June, 2024
 * @update_date 23 June, 2024
 */

// export general ledger validators
module.exports = {
  validateGeneralLedgerId: require("./validate-general-ledger-id"),
  validateGeneralLedger: require("./validate-general-ledger"),
};
