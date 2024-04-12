/**
 * @file /routes/users/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 08 April, 2024
 * @update_date 13 April, 2024
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
const { isAuthorized, isAllowed } = require('../../middlewares/auth');
const {
    validateUserId,
    validateUser,
    validateUserSelf,
} = require('../../middlewares/validators/users');
const { validateAvatar } = require('../../middlewares/validators/files');
const { uploadAvatar } = require('../../middlewares/files');
const { validateExistedAccount } = require('../../middlewares/validators/global');

// constants
const { USER_ROLES } = require('../../constants');

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
 * @access private - ['admin']
 * @method GET
 */
router.get('/', isAllowed(['admin']), getAllUsers);

/**
 * @description get user by mongo id
 * @param {string} path - /users/:id
 * @param {function} middleware - ['isAllowed', 'validateUserId']
 * @param {function} controller - ['getUserById']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get('/:id', isAllowed(['admin']), validateUserId, getUserById);

/**
 * @description update user by self
 * @param {string} path - /users/self
 * @param {function} middleware - ['isAllowed', 'validateUserSelf']
 * @param {function} controller - ['updateUserBySelf']
 * @returns {object} - router
 * @access private - [USER_ROLES]
 * @method PATCH
 */
router.patch(
    '/self',
    isAllowed(USER_ROLES),
    validateAvatar,
    validateExistedAccount,
    validateUserSelf,
    uploadAvatar('users'),
    updateUserBySelf
);

/**
 * @description update user by mongo id
 * @param {string} path - /users/:id
 * @param {function} middleware - ['isAllowed', 'validateUser']
 * @param {function} controller - ['updateUserById']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PATCH
 */
router.patch(
    '/:id',
    isAllowed(['admin']),
    validateUserId,
    validateAvatar,
    validateExistedAccount,
    validateUser,
    uploadAvatar('users'),
    updateUserById
);

/**
 * @description delete user by mongo id
 * @param {string} path - /users/:id
 * @param {function} middleware - ['isAllowed', 'validateUserId']
 * @param {function} controller - ['deleteUserById']
 * @returns {object} - router
 * @access private - ['admin']
 * @method DELETE
 */
router.delete('/:id', isAllowed(['admin']), validateUserId, deleteUserById);

/**
 * @description delete user by self
 * @param {string} path - /users/self
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['deleteUserBySelf']
 * @returns {object} - router
 * @access private - ['user']
 * @method DELETE
 */
router.delete('/', isAllowed(['user']), deleteUserBySelf);

// export
module.exports = router;
