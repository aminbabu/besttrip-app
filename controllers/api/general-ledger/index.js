/**
 * @file controllers/api/general-ledger/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 23 June, 2021
 * @update_date 23 June, 2021
 */

// export general ledger controllers
module.exports = {
  getGeneralLedger: require("./get-general-ledger"),
  getGeneralLedgerById: require("./get-general-ledger-by-id"),
  createGeneralLedger: require("./create-general-ledger"),
  updateGeneralLedger: require("./update-general-ledger"),
  deleteGeneralLedger: require("./delete-general-ledger"),
};
