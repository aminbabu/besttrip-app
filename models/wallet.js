/**
 * @file /models/wallet.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 24 June, 2024
 * @update_date 24 June, 2024
 */

// dependencies
const { model } = require("mongoose");
const { walletSchema } = require("../schemas/mongoose");

// export model
module.exports = model("Wallet", walletSchema);
