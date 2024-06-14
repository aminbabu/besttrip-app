/**
 * @file controllers/api/roles/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 June, 2024
 * @update_date 14 June, 2024
 */

// export all role controllers
module.exports = {
    getRoles: require('./get-roles'),
    getRole: require('./get-role'),
    createRole: require('./create-role'),
    updateRole: require('./update-role'),
    deleteRole: require('./delete-role'),
};
