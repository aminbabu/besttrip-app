/**
 * @file /models/history.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 04 June, 2024
 */

// dependencies
const { model } = require('mongoose');
const { historySchema } = require('../schemas/mongoose');

// export model
module.exports = model('History', historySchema);
