/**
 * @file routes/dashboard/users/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 14 June, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const { viewUsers, editUser, viewProfile } = require('../../../controllers/dashboard/users');

// middlewares
const { isAuthorized } = require('../../../middlewares/dashboard/auth');

/**
 * @description check if user is authorized
 * @param {string} path - '/dashboard/users'
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @method USE
 */
router.use(isAuthorized);

/**
 * @description - users view route
 * @param {string} path - '/dashboard/users'
 * @param {function} controller - ['viewUsers']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/', viewUsers);

/**
 * @description - profile view route
 * @param {string} path - '/dashboard/users/profile'
 * @param {function} controller - ['viewProfile']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/profile', viewProfile);

/**
 * @description - edit user view route
 * @param {string} path - '/dashboard/users/edit'
 * @param {function} controller - ['editUser']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/edit', editUser);

// export profile router
module.exports = router;
