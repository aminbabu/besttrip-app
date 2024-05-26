/**
 * @file /index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 May, 2024
 * @update_date 22 May, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// middlewares
const { csp } = require('../middlewares/global');

/**
 * @description - csp middleware
 * @param {string} path - '/'
 * @param {function} middleware - ['csp']
 * @returns {object} - router
 * @method USE
 */
router.use(csp);

// routes for api
router.use('/dashboard', require('./dashboard'));
router.use('/dashboard', require('./auth/users'));
// router.use('/users', require('./users'));
// router.use('/customers', require('./customers'));
// router.use('/settings/site/general', require('./settings/site/general'));
// router.use('/settings/site/contact', require('./settings/site/contact'));
// router.use('/settings/site/policy', require('./settings/site/policy'));
// router.use('/settings/site/meta', require('./settings/site/meta'));
// router.use('/settings/payments', require('./settings/payments'));
// router.use('/settings/content/sections', require('./settings/content/sections'));
// router.use('/settings/content/exclusive-offers', require('./settings/content/exclusive-offers'));
// router.use('/settings/content/hotel-offers', require('./settings/content/hotel-offers'));
// router.use('/settings/content/flight-offers', require('./settings/content/flight-offers'));
// router.use('/settings/content/umrah-offers', require('./settings/content/umrah-offers'));
// router.use('/settings/content/blog-posts', require('./settings/content/blog-posts'));
// router.use('/settings/themes', require('./settings/themes'));
// router.use('/payment-requests', require('./payment-requests'));
// router.use('/umrah/packages', require('./umrah/packages'));
// router.use('/umrah/package-durations', require('./umrah/package-durations'));
// router.use('/umrah/package-types', require('./umrah/package-types'));

// export router
module.exports = router;
