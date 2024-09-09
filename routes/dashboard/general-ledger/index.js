/**
 * @file routes/general-ledger/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    viewGeneralLedger,
} = require('../../../controllers/dashboard/general-ledger');

// middlewares
const { isAuthorized } = require('../../../middlewares/dashboard/auth');

/**
 * @description check if user is authorized
 * @param {string} path - '/general-ledger'
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @method USE
 */
router.use(isAuthorized);

// /**
//  * @description - general ledger view route
//  * @param {string} path - '/general-ledgers'
//  * @param {function} controller - ['viewGeneralLedger']
//  * @returns {object} - router
//  * @access private - ['all']
//  * @method GET
//  */
// router.get('/', viewGeneralLedger);

// export router
module.exports = router;
