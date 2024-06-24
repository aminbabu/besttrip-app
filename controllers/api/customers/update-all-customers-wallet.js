/**
 * @file /controllers/api/customers/update-all-customers-wallet.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 April, 2024
 * @update_date 24 June, 2024
 */

// dependencies
const { Wallet } = require("../../../models");

// export update all customers wallet controller
module.exports = async (req, res, next) => {
  try {
    // get validated data
    const { balance, type } = req.body;

    // get customer's wallet
    const wallets = await Wallet.find({}).select("customer balance");

    // update all customers wallet
    wallets.forEach(async (wallet) => {
      wallet.balance =
        type === "top-up"
          ? wallet.balance + balance
          : wallet.balance - balance < 0
            ? 0
            : wallet.balance - balance;

      // save wallet
      await wallet.save();
    });

    return res.status(200).json({
      message: "Updated all customers wallet successfully",
    });
  } catch (error) {
    return next(error);
  }
};
