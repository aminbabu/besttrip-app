/**
 * @file /models/umrah/package.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 25 April, 2024
 * @update_date 09 May, 2024
 */

// dependencies
const { model } = require('mongoose');
const { travelerSchema } = require('../../schemas/mongoose');

// export model
module.exports = model('traveler', travelerSchema);
