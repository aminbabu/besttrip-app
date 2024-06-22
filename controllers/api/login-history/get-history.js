/**
 * @file /controllers/api/login-history/get-history.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 22 June, 2024
 * @update_date 22 June, 2024
 */

// dependencies
const { LoginHistory } = require("../../../models");

// export get history controller
module.exports = async (req, res, next) => {
  try {
    // find all history
    const history = await LoginHistory.find().sort({ createdAt: -1 });

    // return response
    return res.status(200).json({
      message: "Fetched all login history",
      history,
    });
  } catch (error) {
    return next(error);
  }
};
