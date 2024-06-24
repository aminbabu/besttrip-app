/**
 * @file /controllers/api/wallets/getWallet.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 24 June, 2024
 * @update_date 24 June, 2024
 */

// dependencies
const { Wallet } = require("../../../models");

// export get wallet controller
module.exports = async (req, res, next) => {
  try {
    // get validated Data
    const { user, customer } = req.query;

    // get wallet by customer/user id
    const wallet = await Wallet.findOne({
      $or: [{ user }, { customer }],
    });

    // check if wallet exists
    if (!wallet) {
      return res.status(404).json({
        message: "Wallet not found",
      });
    }

    // return wallet
    return res.status(200).json({
      message: "Fetch wallet successfully",
      wallet,
    });
  } catch (error) {
    next(error);
  }
};
