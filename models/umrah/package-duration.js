/**
 * @file /models/umrah/package-duration.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 28 April, 2024
 */

// dependencies
const { model } = require('mongoose');
const { umrahPackageDurationSchema } = require('../../schemas/mongoose');

// export model
module.exports = model('UmrahPackageDuration', umrahPackageDurationSchema);
