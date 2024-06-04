/**
 * @file /routes/dashboard/errors/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 June, 2024
 * @update_date 03 June, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const { view401, view404, view500 } = require('../../../controllers/dashboard/errors');

/**
 * @description view 401 error
 * @param {string} path - //dashboard/login
 * @param {function} controller - ['view401']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/401', view401);

/**
 * @description view 404 error
 * @param {string} path - /errors/404
 * @param {function} controller - ['view404']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/404', view404);

/**
 * @description view 500 error
 * @param {string} path - /errors/500
 * @param {function} controller - ['view500']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get('/500', view500);

// export router
module.exports = router;
