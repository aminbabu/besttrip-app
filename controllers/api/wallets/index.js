/**
 * @file /controllers/api/wallets/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 24 June, 2024
 * @update_date 24 June, 2024
 */

// export all wallets controllers
module.exports = {
  getWallets: require("./getWallets"),
  getWallet: require("./getWallet"),
  createWallet: require("./createWallet"),
  updateWallet: require("./updateWallet"),
  deleteWallet: require("./deleteWallet"),
};
