/**
 * @file /models/general-ledger.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const { model } = require('mongoose');
const { generalLedgerSchema } = require('../schemas/mongoose');

// export model
module.exports = model('GeneralLedger', generalLedgerSchema);
