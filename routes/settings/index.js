/**
 * @file /routes/settings/index.js
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
router.use('/site', require('./site'));
// router.use('/payments', require('./payments'));
// router.use('/content', require('./content'));
// router.use('/themes', require('./themes'));

// export router
module.exports = router;
