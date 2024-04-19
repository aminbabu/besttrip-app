/**
 * @file /models/settings/site/policy-settings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const { model } = require('mongoose');
const { policySettingsSchema } = require('../../../schemas/mongoose');

// export model
module.exports = model('PolicySettings', policySettingsSchema);
