/**
 * @file /utils/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March 2024
 * @update_date 22 March 2024
 */

// export all utilities
module.exports = {
  generateToken: require("./generate-token"),
  comparePassword: require("./compare-password"),
  sendEmail: require("./send-email"),
  verifyToken: require("./verify-token"),
};
