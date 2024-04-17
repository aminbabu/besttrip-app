/**
 * @file /models/settings/payments.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 17 April 2024
 */

// dependencies
const { model } = require('mongoose');
const { paymentsSettingsSchema } = require('../../schemas/mongoose');

// export model
module.exports = model('PaymentsSettings', paymentsSettingsSchema);
