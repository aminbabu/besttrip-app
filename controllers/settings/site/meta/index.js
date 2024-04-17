/**
 * @file /controllers/settings/site/meta/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 17 April, 2024
 */

// export meta settings controllers
module.exports = {
    getMetaSettings: require('./get-meta-settings'),
    getMetaSettingsById: require('./get-meta-settings-by-id'),
    createMetaSettings: require('./create-meta-settings'),
    updateMetaSettings: require('./update-meta-settings'),
    deleteMetaSettings: require('./delete-meta-settings'),
};
