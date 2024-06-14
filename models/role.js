/**
 * @file /models/role.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 June, 2024
 * @update_date 14 June, 2024
 */

// dependencies
const { model } = require('mongoose');
const { roleSchema } = require('../schemas/mongoose');

// export model
module.exports = model('Role', roleSchema);
