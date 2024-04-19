/**
 * @file /models/settings/content/exclusive.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { model } = require('mongoose');
const { contentExclusiveOffersSchema } = require('../../../schemas/mongoose');

// export model
module.exports = model('ContentExclusiveOffers', contentExclusiveOffersSchema);
