/**
 * @file /routes/users/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 08 April, 2024
 * @update_date 18 May, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    getAllUsers,
    getUser,
    updateUser,
    updateUserBySelf,
    deleteUser,
    deleteUserBySelf,
} = require('../../../controllers/api/users');

// middlewares
const { isAuthorized, isAllowed } = require('../../../middlewares/api/auth');
const {
    validateUserId,
    validateUser,
    validateUserSelf,
    validateUserAccount,
} = require('../../../middlewares/validators/users');
const { validateAvatar } = require('../../../middlewares/validators/files');
const { uploadAvatar } = require('../../../middlewares/api/files');

// constants
const { USER_ROLES } = require('../../../constants/api');

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
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateUserId']
 * @param {function} controller - ['getUser']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get('/:id', isAllowed(['admin']), validateUserId, getUser);

/**
 * @description update user by self
 * @param {string} path - /users/self
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateAvatar', 'validateUserAccount']
 * @param {function} validator - ['validateUserSelf']
 * @param {function} controller - ['updateUserBySelf']
 * @returns {object} - router
 * @access private - [USER_ROLES]
 * @method PATCH
 */
router.patch(
    '/self',
    isAllowed(USER_ROLES),
    validateAvatar,
    validateUserAccount,
    validateUserSelf,
    uploadAvatar('avatars/users'),
    updateUserBySelf
);

/**
 * @description update user by mongo id
 * @param {string} path - /users/:id
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateAvatar', 'validateUserAccount']
 * @param {function} validator - ['validateUser']
 * @param {function} controller - ['updateUser']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PATCH
 */
router.patch(
    '/:id',
    isAllowed(['admin']),
    validateAvatar,
    validateUserAccount,
    validateUser,
    uploadAvatar('avatars/users'),
    updateUser
);

/**
 * @description delete user by mongo id
 * @param {string} path - /users/:id
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateUserId']
 * @param {function} controller - ['deleteUser']
 * @returns {object} - router
 * @access private - ['admin']
 * @method DELETE
 */
router.delete('/:id', isAllowed(['admin']), validateUserId, deleteUser);

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
