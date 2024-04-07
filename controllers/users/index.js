/**
 * @file /controllers/users/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 07 April, 2024
 * @update_date 07 April, 2024
 */

// export all controllers
module.exports = {
    getAllUsers: require('./get-all-users'),
    getUserById: require('./get-user-by-id'),
    updateUserById: require('./update-user-by-id'),
    updateUserBySelf: require('./update-user-by-self'),
    deleteUserById: require('./delete-user-by-id'),
    deleteUserBySelf: require('./delete-user-by-self'),
};
