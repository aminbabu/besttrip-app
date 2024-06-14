/**
 * @file middlewares/api/validators/roles/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 June, 2024
 * @update_date 14 June, 2024
 */

// export all roles validators
module.exports = {
    validateRoleId: require('./validate-role-id'),
    validateRole: require('./validate-role'),
};
