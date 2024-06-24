/**
 * @file /controllers/api/wallets/getWallets.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 24 June, 2024
 * @update_date 24 June, 2024
 */

// dependencies
const { Wallet } = require("../../../models");

// export get wallets controller
module.exports = async (req, res, next) => {
  try {
    // get all wallets
    const wallets = await Wallet.find();

    // check if wallets exist
    if (!wallets.length) {
      return res.status(404).json({
        message: "No wallets found",
      });
    }

    // return wallets
    return res.status(200).json({
      message: "Fetch wallets successfully",
      wallets,
    });
  } catch (error) {
    next(error);
  }
};
