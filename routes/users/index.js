/**
 * @file /routes/users/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 07 April, 2024
 * @update_date 07 April, 2024
 */

// dependencies
const express = require('express');

const router = express.Router();

// controllers
const {
    getAllUsers,
    getUserById,
    updateUserById,
    updateUserBySelf,
    deleteUserById,
    deleteUserBySelf,
} = require('../../controllers/users');

// middlewares
const { isAuthorized, isAllowed, isSelf } = require('../../middlewares/auth');
const { validateUser, validateUserSelf } = require('../../middlewares/validators/users');

/**
 * @description check if user is authorized
 * @param {string} path - /users
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @access private
 * @method USE
 */
router.use(isAuthorized);

/**
 * @description get all users
 * @param {string} path - /users
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['getAllUsers']
 * @returns {object} - router
 * @access private
 * @method GET
 */
router.get('/', isAllowed(['admin']), getAllUsers);

/**
 * @description get by mongo id
 * @param {string} path - /users/:id
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['getUserById']
 * @returns {object} - router
 * @access private
 * @method GET
 */
router.get('/:id', isAllowed(['admin']), getUserById);

/**
 * @description update user by mongo id
 * @param {string} path - /users/:id
 * @param {function} middleware - ['isAllowed', 'validateUser']
 * @param {function} controller - ['updateUserById']
 * @returns {object} - router
 * @access private
 * @method PATCH
 */
router.patch('/:id', isAllowed(['admin']), validateUser, updateUserById);

/**
 * @description update user by self
 * @param {string} path - /users/:id
 * @param {function} middleware - ['isSelf', 'isAllowed', 'validateUserSelf']
 * @param {function} controller - ['updateUserBySelf']
 * @returns {object} - router
 * @access private
 * @method PATCH
 */
router.patch('/:id/self', isSelf, isAllowed(['user']), validateUserSelf, updateUserBySelf);

/**
 * @description delete user by mongo id
 * @param {string} path - /users/:id
 * @param {function} controller - ['deleteUserById']
 * @returns {object} - router
 * @access private
 * @method DELETE
 */
router.delete('/:id', isAllowed(['admin']), deleteUserById);

/**
 * @description delete user by self
 * @param {string} path - /users/:id/self
 * @param {function} middleware - ['isSelf', 'isAllowed']
 * @param {function} controller - ['deleteUserBySelf']
 * @returns {object} - router
 * @access private
 * @method DELETE
 */
router.delete('/:id/self', isSelf, isAllowed(['user']), deleteUserBySelf);

// export
module.exports = router;
