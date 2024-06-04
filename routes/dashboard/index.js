/**
 * @file routes/dashboard/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 June, 2024
 * @update_date 04 June, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// routes
router.use('/', require('./home'));
router.use('/', require('./auth'));
router.use('/users', require('./users'));

// export dashboard router
module.exports = router;
