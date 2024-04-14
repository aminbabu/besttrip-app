/**
 * @file /models/token.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const { model } = require('mongoose');
const moment = require('moment');
const { tokenSchema } = require('../schemas/mongoose');

// set expires after 20 minutes before saving
tokenSchema.pre('save', function (next) {
    this.expires = moment().add(20, 'minutes').toDate();
    next();
});

// token model
const Token = model('Token', tokenSchema);

// export model
module.exports = Token;
