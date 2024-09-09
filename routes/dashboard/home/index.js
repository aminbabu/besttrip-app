/**
 * @file routes/home/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 21 June, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    viewDashboard,
    signOut,
} = require('../../../controllers/dashboard/home');

// middlewares
const { isAuthorized } = require('../../../middlewares/dashboard/auth');

/**
 * @description - dashboard view route
 * @param {string} path - '/'
 * @param {function} middleware - ['isAuthorized']
 * @param {function} controller - ['viewDashboard']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/', isAuthorized, viewDashboard);

/**
 * @description - sign-up route
 * @param {string} path - '/sign-up'
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/sign-up', (req, res) => res.redirect('/auth/register'));

/**
 * @description - register route
 * @param {string} path - '/register'
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/register', (req, res) => res.redirect('/auth/register'));

/**
 * @description - sign-in route
 * @param {string} path - '/sign-in'
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/sign-in', (req, res) => res.redirect('/auth/login'));

/**
 * @description - login route
 * @param {string} path - '/login'
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/login', (req, res) => res.redirect('/auth/login'));

/**
 * @description - logout route
 * @param {string} path - '/logout'
 * @param {function} controller - ['logout']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/logout', signOut);

/**
 * @description - sign-out route
 * @param {string} path - '/sign-out'
 * @param {function} controller - ['signOut']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get('/sign-out', signOut);

// export dashboard router
module.exports = router;
