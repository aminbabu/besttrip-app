/**
 * @file /controllers/api/settings/site/policy/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 03 Jul, 2024
 */

// export site policy settings controllers
module.exports = {
    getPolicies: require('./get-policies'),
    updateOrCreagtePolicy: require('./update-or-create-policy'),
};
