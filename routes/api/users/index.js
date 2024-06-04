/**
 * @file /routes/api/users/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 08 April, 2024
 * @update_date 03 June, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    viewUserProfile,
    getAllUsers,
    getUser,
    updateUser,
    updateUserBySelf,
    deleteUser,
    deleteUserBySelf,
} = require('../../../controllers/users');

// middlewares
const { isAuthorized, isAllowed, isUserAuthorized } = require('../../../middlewares/auth');
const {
    validateUserId,
    validateUser,
    validateUserSelf,
    validateUserAccount,
} = require('../../../middlewares/validators/users');
const { validateAvatar } = require('../../../middlewares/validators/files');
const { uploadAvatar } = require('../../../middlewares/files');

// constants
const { USER_ROLES } = require('../../../constants');

/**
 * @description get all users
 * @param {string} path - /users
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} controller - ['getAllUsers']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get('/', isAuthorized, isAllowed(['admin']), getAllUsers);

/**
 * @description view user profile by self
 * @param {string} path - /users/profile
 * @param {function} middleware - ['isUserAuthorized']
 * @param {function} controller - ['viewUserProfile']
 * @returns {object} - router
 * @access private - []
 * @method GET
 */
router.get('/profile', isUserAuthorized, viewUserProfile);

/**
 * @description get user by mongo id
 * @param {string} path - /users/:id
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validateUserId']
 * @param {function} controller - ['getUser']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get('/:id', isAuthorized, isAllowed(['admin']), validateUserId, getUser);

/**
 * @description update user by self
 * @param {string} path - /users/self
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validateAvatar', 'validateUserAccount']
 * @param {function} validator - ['validateUserSelf']
 * @param {function} controller - ['updateUserBySelf']
 * @returns {object} - router
 * @access private - [USER_ROLES]
 * @method PATCH
 */
router.patch(
    '/self',
    isAuthorized,
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
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validateAvatar', 'validateUserAccount']
 * @param {function} validator - ['validateUser']
 * @param {function} controller - ['updateUser']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PATCH
 */
router.patch(
    '/:id',
    isAuthorized,
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
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validateUserId']
 * @param {function} controller - ['deleteUser']
 * @returns {object} - router
 * @access private - ['admin']
 * @method DELETE
 */
router.delete('/:id', isAuthorized, isAllowed(['admin']), validateUserId, deleteUser);

/**
 * @description delete user by self
 * @param {string} path - /users/self
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} controller - ['deleteUserBySelf']
 * @returns {object} - router
 * @access private - ['user']
 * @method DELETE
 */
router.delete('/', isAuthorized, isAllowed(['user']), deleteUserBySelf);

// export
module.exports = router;
