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

// manage wallet before saving
walletSchema.pre("save", async function (next) {
  try {
    // check if customer is new
    if (!this.isNew) {
      return next();
    }

    // check if wallet is not provided
    if (!this.balance) {
      this.balance = 0;
    }

    return next();
  } catch (error) {
    return next(error);
  }
});

// export model
module.exports = model("Wallet", walletSchema);
