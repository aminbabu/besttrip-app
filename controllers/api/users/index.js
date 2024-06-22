/**
 * @file /controllers/api/users/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 08 April, 2024
 * @update_date 22 June, 2024
 */

// export all controllers
module.exports = {
  getAllUsers: require("./get-all-users"),
  getUser: require("./get-user"),
  createUser: require("./create-user"),
  updateUser: require("./update-user"),
  updatePassword: require("./update-password"),
  updateRole: require("./update-role"),
  updateUserBySelf: require("./update-user-by-self"),
  updatePasswordBySelf: require("./update-password-by-self"),
  disableUserBySelf: require("./disable-user-by-self"),
  disableUser: require("./disable-user"),
  deleteUser: require("./delete-user"),
  deleteUserBySelf: require("./delete-user-by-self"),
  deleteUserLoginHistory: require("./delete-user-login-history"),
  deleteUserLoginHistoryBySelf: require("./delete-user-login-history-by-self"),
};
