/**
 * @file /controllers/api/login-history/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 22 June, 2024
 * @update_date 22 June, 2024
 */

// export all history controllers
module.exports = {
  getHistory: require("./get-history"),
  getHistoryById: require("./get-history-by-id"),
  deleteHistory: require("./delete-history"),
};
