/**
 * @file /middlewares/api/validators/wallets/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 24 June, 2024
 * @update_date 24 June, 2024
 */

// export wallet validators
module.exports = {
  validateWalletId: require("./validate-wallet-id"),
  validateWallet: require("./validate-wallet"),
};
