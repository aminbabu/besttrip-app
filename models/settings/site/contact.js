/**
 * @file /models/settings/site/contact-settings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 13 April, 2024
 * @update_date 17 April, 2024
 */

// dependencies
const { model } = require('mongoose');
const { contactSettingsSchema } = require('../../../schemas/mongoose');

// export model
module.exports = model('ContactSettings', contactSettingsSchema);
