/**
 * @file controllers/api/general-ledger/get-general-ledger.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 23 June, 2021
 * @update_date 23 June, 2021
 */

// dependencies
const { GeneralLedger } = require("../../../models");

// export get general ledger controller
module.exports = async (req, res, next) => {
  try {
    // get all general ledgers
    const generalLedgers = await GeneralLedger.find();

    // send response
    return res.status(200).json({
      message: "Fetched general ledgers successfully",
      generalLedgers,
    });
  } catch (error) {
    return next(error);
  }
};
