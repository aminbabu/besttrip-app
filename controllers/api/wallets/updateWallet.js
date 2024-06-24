/**
 * @file /controllers/api/wallets/updateWallet.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 24 June, 2024
 * @update_date 24 June, 2024
 */

// dependencies
const { Wallet } = require("../../../models");

// export update wallet controller
module.exports = async (req, res, next) => {
  try {
    // update validated Data
    const { user, customer } = req.query;
    const { balance, type, description } = req.body;

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

    // update wallet balance
    if (type === "top-up") {
      wallet.set({ balance: wallet.balance + balance, type, description });
    } else {
      wallet.set({ balance: wallet.balance - balance, type, description });
    }

    // save wallet
    await wallet.save();

    // return response
    return res.status(200).json({
      message: "Wallet updated successfully",
      wallet,
    });
  } catch (error) {
    next(error);
  }
};
