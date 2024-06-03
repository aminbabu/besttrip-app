/**
 * @file /routes/dashboard/users/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 27 May, 2024
 * @update_date 03 June, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    getUsers,
    getUser,
    updateUser,
    updateUserBySelf,
    deleteUser,
    deleteUserBySelf,
} = require('../../controllers/users');

// middlewares
const { isAuthorized, isNotAllowed, isAllowed } = require('../../middlewares/auth');
const {
    validateUser,
    validateUserSelf,
    validateUserAccount,
} = require('../../middlewares/validators/users');
const { validateAvatar } = require('../../middlewares/validators/files');
const { uploadAvatar } = require('../../middlewares/files');

// constants
const { USER_ROLES } = require('../../constants');

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
router.get('/', isAllowed(['admin']), getUsers);

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

/**
 * @description update user by self
 * @param {string} path - /dashboard/users/self
 * @param {function} middleware - ['isNotAllowed']
 * @param {function} validator - ['validateAvatar', 'validateUserAccount']
 * @param {function} validator - ['validateUserSelf']
 * @param {function} controller - ['updateUserBySelf']
 * @returns {object} - router
 * @access private - [USER_ROLES]
 * @method PATCH
 */
router.patch(
    '/self',
    isNotAllowed(USER_ROLES),
    validateAvatar,
    validateUserAccount,
    validateUserSelf,
    uploadAvatar('avatars/users'),
    updateUserBySelf
);

/**
 * @description update user by mongo id
 * @param {string} path - /dashboard/users/:id
 * @param {function} middleware - ['isNotAllowed']
 * @param {function} validator - ['validateAvatar', 'validateUserAccount']
 * @param {function} validator - ['validateUser']
 * @param {function} controller - ['updateUser']
 * @returns {object} - router
 * @access private - ['customer']
 * @method PATCH
 */
router.patch(
    '/:id',
    isNotAllowed(['customer']),
    validateAvatar,
    validateUserAccount,
    validateUser,
    uploadAvatar('avatars/users'),
    updateUser
);

/**
 * @description delete user by mongo id
 * @param {string} path - /dashboard/users/:id
 * @param {function} middleware - ['isNotAllowed']
 * @param {function} controller - ['deleteUser']
 * @returns {object} - router
 * @access private - ['customer']
 * @method DELETE
 */
router.delete('/:id', isNotAllowed(['customer']), deleteUser);

/**
 * @description delete user by self
 * @param {string} path - /dashboard/users/self
 * @param {function} middleware - ['isNotAllowed']
 * @param {function} controller - ['deleteUserBySelf']
 * @returns {object} - router
 * @access private - ['user']
 * @method DELETE
 */
router.delete('/', isNotAllowed(['user']), deleteUserBySelf);

// export
module.exports = router;
