/**
 * @file /routes/settings/site/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 April, 2024
 * @update_date 04 April, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// routers
router.use('/general', require('./general'));
// router.use('/contact', require('./contact'));
// router.use('/policy', require('./policy'));
// router.use('/additional', require('./additional'));

// export router
module.exports = router;
