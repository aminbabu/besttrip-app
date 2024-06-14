/**
 * @file routes/api/roles/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 June, 2024
 * @update_date 14 June, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    getRoles,
    getRole,
    createRole,
    updateRole,
    deleteRole,
} = require('../../../controllers/api/roles');

// middlewares
const { isAuthorized } = require('../../../middlewares/api/auth');
const { validateRoleId, validateRole } = require('../../../middlewares/api/validators/roles');

/**
 * @description check if user is authorized
 * @param {string} path - '/api/roles'
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @method USE
 */
router.use(isAuthorized);

/**
 * @description - get all roles route
 * @param {string} path - '/api/roles'
 * @param {function} controller - ['getRoles']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get('/', getRoles);

/**
 * @description - get role route
 * @param {string} path - '/api/roles/:id'
 * @param {function} controller - ['getRole']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get('/:id', validateRoleId, getRole);

/**
 * @description - add role route
 * @param {string} path - '/api/roles'
 * @param {function} controller - ['createRole']
 * @returns {object} - router
 * @access private - ['admin']
 * @method POST
 */
router.post('/', validateRole, createRole);

/**
 * @description - update role route
 * @param {string} path - '/api/roles/:id'
 * @param {function} controller - ['updateRole']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PATCH
 */
router.patch('/:id', validateRoleId, validateRole, updateRole);

/**
 * @description - delete role route
 * @param {string} path - '/api/roles/:id'
 * @param {function} controller - ['deleteRole']
 * @returns {object} - router
 * @access private - ['admin']
 * @method DELETE
 */
router.delete('/:id', validateRoleId, deleteRole);

// export roles router
module.exports = router;
