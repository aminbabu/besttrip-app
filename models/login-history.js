/**
 * @file /models/login-history.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 21 June, 2024
 */

// dependencies
const { model } = require('mongoose');
const { loginHistorySchema } = require('../schemas/mongoose');

// export model
module.exports = model('LoginHistory', loginHistorySchema);
