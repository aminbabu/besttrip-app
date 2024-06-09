/**
 * @file /controllers/api/users/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 08 April, 2024
 * @update_date 09 June, 2024
 */

// export all controllers
module.exports = {
    getAllUsers: require('./get-all-users'),
    getUser: require('./get-user'),
    updateUser: require('./update-user'),
    updatePassword: require('./update-password'),
    updateUserBySelf: require('./update-user-by-self'),
    updatePasswordBySelf: require('./update-password-by-self'),
    disableUserBySelf: require('./disable-user-by-self'),
    deleteUser: require('./delete-user'),
    deleteUserBySelf: require('./delete-user-by-self'),
};
