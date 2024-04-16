/**
 * @file /controllers/settings/site/policy/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 16 April, 2024
 */

// export site policy settings controllers
module.exports = {
    getPolicy: require('./get-policy'),
    createPolicy: require('./create-policy'),
    updatePolicy: require('./update-policy'),
};
