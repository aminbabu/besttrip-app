/**
 * @file /controllers/wallet/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 29 March 2024
 * @update_date 29 March 2024
 */

// export all controllers
module.exports = {
    createWallet: require('./create-wallet'),
    getAllWallets: require('./get-all-wallets'),
    getWalletById: require('./get-wallet-by-id'),
    updateWalletById: require('./update-wallet-by-id'),
    deleteWalletById: require('./delete-wallet-by-id'),
};
