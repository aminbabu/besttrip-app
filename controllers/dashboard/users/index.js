/**
 * @file /controllers/dashboard/users/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 June, 2024
 * @update_date 14 June, 2024
 */

// export all user controllers
module.exports = {
    viewUsers: require('./view-users'),
    editUser: require('./edit-user'),
    viewProfile: require('./view-profile'),
};
