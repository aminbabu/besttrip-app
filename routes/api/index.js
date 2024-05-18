/**
 * @file /routes/api/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 May, 2024
 * @update_date 18 May, 2024
 */

// dependencies
const express = require('express');

// express router
const api = express.Router();

// routes
api.use('/auth/users', require('./auth/users'));
api.use('/auth/customers', require('./auth/customers'));
api.use('/users', require('./users'));
api.use('/customers', require('./customers'));
api.use('/settings/site/general', require('./settings/site/general'));
api.use('/settings/site/contact', require('./settings/site/contact'));
api.use('/settings/site/policy', require('./settings/site/policy'));
api.use('/settings/site/meta', require('./settings/site/meta'));
api.use('/settings/payments', require('./settings/payments'));
api.use('/settings/content/sections', require('./settings/content/sections'));
api.use('/settings/content/exclusive-offers', require('./settings/content/exclusive-offers'));
api.use('/settings/content/hotel-offers', require('./settings/content/hotel-offers'));
api.use('/settings/content/flight-offers', require('./settings/content/flight-offers'));
api.use('/settings/content/umrah-offers', require('./settings/content/umrah-offers'));
api.use('/settings/content/blog-posts', require('./settings/content/blog-posts'));
api.use('/settings/themes', require('./settings/themes'));
api.use('/payment-requests', require('./payment-requests'));
api.use('/umrah/packages', require('./umrah/packages'));
api.use('/umrah/package-durations', require('./umrah/package-durations'));
api.use('/umrah/package-types', require('./umrah/package-types'));

// export router
module.exports = api;
