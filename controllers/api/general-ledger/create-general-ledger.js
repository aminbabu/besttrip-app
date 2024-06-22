/**
 * @file controllers/api/general-ledger/create-general-ledger.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 23 June, 2021
 * @update_date 23 June, 2021
 */

// dependencies
const { GeneralLedger } = require("../../../models");

// export create general ledger controller
module.exports = async (req, res, next) => {
  try {
    // get validated data
    const validatedData = req.body;

    // create general ledger
    const generalLedger = new GeneralLedger(validatedData);

    // save general ledger
    await generalLedger.save();

    // send response
    return res.status(201).json({
      message: "Created general ledger successfully",
      generalLedger,
    });
  } catch (error) {
    return next(error);
  }
};
