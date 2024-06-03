/**
 * @file /controllers/users/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 June, 2024
 * @update_date 03 June, 2024
 */

// export all controllers
module.exports = {
    getUsers: require('./get-users'),
    getUser: require('./get-user'),
    updateUser: require('./update-user'),
    updateUserBySelf: require('./update-user-by-self'),
    deleteUser: require('./delete-user'),
    deleteUserBySelf: require('./delete-user-by-self'),
};
