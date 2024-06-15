/**
 * @file routes/dashboard/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// routes
router.use('/', require('./home'));
router.use('/auth', require('./auth'));
router.use('/roles', require('./roles'));
router.use('/users', require('./users'));
router.use('/customers', require('./customers'));
router.use('/payment-requests', require('./payment-requests'));
router.use('/umrah/types', require('./umrah/types'));
router.use('/umrah/durations', require('./umrah/durations'));
router.use('/umrah/packages', require('./umrah/packages'));
router.use('/umrah/bookings', require('./umrah/bookings'));
router.use('/invoices', require('./invoices'));
router.use('/general-ledger', require('./general-ledger'));
router.use('/login-history', require('./login-history'));
router.use('/settings/site', require('./settings/site'));
router.use('/settings/content/sections', require('./settings/content/sections'));
router.use('/settings/content/exclusive-offers', require('./settings/content/exclusive-offers'));
router.use('/settings/content/hotel-offers', require('./settings/content/hotel-offers'));
router.use('/settings/content/flight-offers', require('./settings/content/flight-offers'));
router.use('/settings/content/umrah-offers', require('./settings/content/umrah-offers'));
router.use('/settings/content/blog-posts', require('./settings/content/blog-posts'));
router.use('/settings/payments', require('./settings/payments'));
router.use('/settings/themes', require('./settings/themes'));
router.use('/errors', require('./errors'));

// export dashboard router
module.exports = router;
