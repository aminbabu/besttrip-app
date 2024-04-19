/**
 * @file /models/settings/site/general.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 April, 2024
 * @update_date 17 April, 2024
 */

// dependencies
const { model } = require('mongoose');
const { generalSettingsSchema } = require('../../../schemas/mongoose');

// export model
module.exports = model('GeneralSettings', generalSettingsSchema);
