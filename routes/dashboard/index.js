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
router.use('/errors', require('./errors'));

// export dashboard router
module.exports = router;
