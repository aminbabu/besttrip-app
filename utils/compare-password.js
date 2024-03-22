/**
 * @file /utils/compare-password.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March 2024
 * @update_date 22 March 2024
 */

// dependencies
const bcrypt = require("bcrypt");

// compare password
const comparePassword = async (password, hash) => {
  try {
    const match = await bcrypt.compare(password, hash);
    return match;
  } catch (error) {
    throw new Error(error);
  }
};

// export
module.exports = comparePassword;
