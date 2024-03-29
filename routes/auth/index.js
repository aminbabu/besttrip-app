/**
 * @file /routes/auth/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 March 2024
 * @update_date 28 March 2024
 */

// dependencies
const express = require('express');

const router = express.Router();

// routers
const usersRouter = require('./users');
const customersRouter = require('./customers');

// users auth routes
router.use('/users', usersRouter);
// customers auth routes
router.use('/customers', customersRouter);

// export router
module.exports = router;
