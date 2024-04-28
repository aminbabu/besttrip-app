/**
 * @file /models/umrah/package-type.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 28 April, 2024
 */

// dependencies
const { model } = require('mongoose');
const { umrahPackageTypeSchema } = require('../../schemas/mongoose');

// export model
module.exports = model('UmrahPackageType', umrahPackageTypeSchema);
