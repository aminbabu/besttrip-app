/**
 * @file /middlewares/api/validators/settings/site/meta/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 17 April, 2024
 */

// export meta settings validator middleware
module.exports = {
    validateMetaSettingsId: require('./validate-meta-settings-id'),
    validateMetaSettings: require('./validate-meta-settings'),
};
