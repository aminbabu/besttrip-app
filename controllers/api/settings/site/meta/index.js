/**
 * @file /controllers/api/settings/site/meta/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 19 April, 2024
 */

// export meta settings controllers
module.exports = {
    getMetaSettings: require('./get-meta-settings'),
    getMetaSetting: require('./get-meta-setting'),
    createMetaSetting: require('./create-meta-setting'),
    updateMetaSetting: require('./update-meta-setting'),
    deleteMetaSetting: require('./delete-meta-setting'),
};
