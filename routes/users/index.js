/**
 * @file /routes/dashboard/users/index.js
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
const { getUsers, getUser } = require('../../controllers/users');

// middlewares
const { isAuthorized, isNotAllowed } = require('../../middlewares/auth');

/**
 * @description check if user is authorized
 * @param {string} path - /dashboard/users
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @access private
 * @method USE
 */
router.use(isAuthorized);

/**
 * @description get all users
 * @param {string} path - /dashboard/users
 * @param {function} middleware - ['isNotAllowed']
 * @param {function} controller - ['getUsers']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get('/', isNotAllowed(['customer']), getUsers);

/**
 * @description get user by mongo id
 * @param {string} path - /dashboard/users/:id
 * @param {function} middleware - ['isNotAllowed']
 * @param {function} controller - ['getUser']
 * @returns {object} - router
 * @access private - ['customer']
 * @method GET
 */
router.get('/:id', isNotAllowed(['customer']), getUser);
