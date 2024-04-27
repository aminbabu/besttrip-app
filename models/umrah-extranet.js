/**
 * @file /models/umrah-extranet.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 25 April, 2024
 * @update_date 25 April, 2024
 */

// dependencies
const { model } = require('mongoose');
const { umrahExtranetSchema } = require('../schemas/mongoose');

// export model
module.exports = model('UmrahExtranet', umrahExtranetSchema);
