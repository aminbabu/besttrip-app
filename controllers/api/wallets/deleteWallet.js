/**
 * @file /controllers/api/wallets/deleteWallet.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 24 June, 2024
 * @update_date 24 June, 2024
 */

// dependencies
const { Wallet } = require("../../../models");

// export delete wallet controller
module.exports = async (req, res, next) => {
  try {
    // get validated Data
    const { id } = req.params;

    // get wallet by customer/user id
    const wallet = await Wallet.findOne({
      $or: [{ customer: id }, { user: id }],
    });

    // check if wallet exists
    if (!wallet) {
      return res.status(404).json({
        message: "Wallet not found",
      });
    }

    // delete wallet
    await wallet.deleteOne();

    // return response
    return res.status(200).json({
      message: "Deleted wallet successfully",
    });
  } catch (error) {
    next(error);
  }
};
