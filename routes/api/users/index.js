/**
 * @file /routes/api/users/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 08 April, 2024
 * @update_date 22 June, 2024
 */

// dependencies
const express = require("express");

// express router
const router = express.Router();

// controllers
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updatePassword,
  updateRole,
  updateUserBySelf,
  disableUserBySelf,
  disableUser,
  updatePasswordBySelf,
  deleteUser,
  deleteUserBySelf,
  deleteUserLoginHistory,
  deleteUserLoginHistoryBySelf,
} = require("../../../controllers/api/users");

// middlewares
const { isAuthorized, isAllowed } = require("../../../middlewares/api/auth");
const {
  validateUserId,
  validateUser,
  validatePassword,
  validateUserSelf,
  validatePasswordSelf,
  validateRole,
} = require("../../../middlewares/api/validators/users");
const { validateAvatar } = require("../../../middlewares/api/validators/files");
const { uploadAvatar } = require("../../../middlewares/api/files");

// constants
const { USER_ROLES } = require("../../../constants");

/**
 * @description check if user is authorized
 * @param {string} path - /api/users
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @method USE
 */
router.use(isAuthorized);

/**
 * @description get all users
 * @param {string} path - /api/users
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} controller - ['getAllUsers']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get("/", isAllowed(["admin"]), getAllUsers);

/**
 * @description get user by mongo id
 * @param {string} path - /api/users/:id
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validateUserId']
 * @param {function} controller - ['getUser']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get("/:id", isAllowed(["admin"]), validateUserId, getUser);

/**
 * @description disable user by self
 * @param {string} path - /api/users/self/disable
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} controller - ['disableUserBySelf']
 * @returns {object} - router
 * @access private - ['all']
 * @method GET
 */
router.get("/self/disable", isAllowed(USER_ROLES), disableUserBySelf);

/**
 * @description disable user by mongo id
 * @param {string} path - /api/users/:id/disable
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} controller - ['disableUser']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get("/:id/disable", isAllowed("admin"), disableUser);

/**
 * @description add user
 * @param {string} path - /api/users/
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validateAvatar', 'validateUserAccount']
 * @param {function} validator - ['validateUser']
 * @param {function} controller - ['createUser']
 * @returns {object} - router
 * @access private - ['admin']
 * @method POST
 */
router.post("/", isAllowed(["admin"]), validateUser, createUser);

/**
 * @description update user by self
 * @param {string} path - /api/users/self
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validateAvatar', 'validateUserAccount']
 * @param {function} validator - ['validateUserSelf']
 * @param {function} controller - ['updateUserBySelf']
 * @returns {object} - router
 * @access private - [USER_ROLES]
 * @method PATCH
 */
router.patch(
  "/self",
  isAllowed(USER_ROLES),
  validateAvatar,
  validateUserSelf,
  uploadAvatar("avatars/users"),
  updateUserBySelf
);

/**
 * @description update user by mongo id
 * @param {string} path - /api/users/:id
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validateAvatar', 'validateUserAccount']
 * @param {function} validator - ['validateUser']
 * @param {function} controller - ['updateUser']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PATCH
 */
router.patch(
  "/:id",
  isAllowed(["admin"]),
  validateAvatar,
  validateUserId,
  validateUser,
  uploadAvatar("avatars/users"),
  updateUser
);

/**
 * @description update password by self
 * @param {string} path - /api/users/self/password
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validatePassword']
 * @param {function} controller - ['updatePasswordBySelf']
 * @returns {object} - router
 * @access private - ['all']
 * @method PATCH
 */
router.patch(
  "/self/password",
  isAllowed(USER_ROLES),
  validatePasswordSelf,
  updatePasswordBySelf
);

/**
 * @description update password by id
 * @param {string} path - /api/users/:id/password
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validatePassword']
 * @param {function} controller - ['updatePassword']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PATCH
 */
router.patch(
  "/:id/password",
  isAllowed(["admin"]),
  validateUserId,
  validatePassword,
  updatePassword
);

/**
 * @description update role
 * @param {string} path - /api/users/:id/role
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validateRole']
 * @param {function} controller - ['updateRole']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PATCH
 */
router.patch("/:id/role", isAllowed(["admin"]), validateRole, updateRole);

/**
 * @description delete user by self
 * @param {string} path - /api/users/self
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} controller - ['deleteUserBySelf']
 * @returns {object} - router
 * @access private - all
 * @method DELETE
 */
router.delete("/self", isAllowed(USER_ROLES), deleteUserBySelf);

/**
 * @description delete user by mongo id
 * @param {string} path - /api/users/:id
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validateUserId']
 * @param {function} controller - ['deleteUser']
 * @returns {object} - router
 * @access private - ['admin']
 * @method DELETE
 */
router.delete("/:id", isAllowed(["admin"]), validateUserId, deleteUser);

/**
 * @description delete user's login history by self
 * @param {string} path - /api/users/self/login-history/all
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} controller - ['deleteUserLoginHistoryBySelf']
 * @returns {object} - router
 * @access private - ['all']
 * @method DELETE
 */
router.delete(
  "/self/login-history/all",
  isAllowed(USER_ROLES),
  deleteUserLoginHistoryBySelf
);

/**
 * @description delete user's login history by mongo id
 * @param {string} path - /api/users/:id/login-history/all
 * @param {function} middleware - ['isAuthorized', 'isAllowed']
 * @param {function} validator - ['validateUserId']
 * @param {function} controller - ['deleteUserLoginHistory']
 * @returns {object} - router
 * @access private - ['admin']
 * @method DELETE
 */
router.delete(
  "/:id/login-history/all",
  isAllowed(["admin"]),
  validateUserId,
  deleteUserLoginHistory
);

// export
module.exports = router;
