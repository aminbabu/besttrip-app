/**
 * @file /models/settings/content/flight-offer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 20 April, 2024
 */

// dependencies
const { model } = require('mongoose');
const { flightOfferSchema } = require('../../../schemas/mongoose');

// export model
module.exports = model('FlightOffer', flightOfferSchema);
