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
router.use('/users', require('./users'));
router.use('/customers', require('./customers'));

// export router
module.exports = router;
