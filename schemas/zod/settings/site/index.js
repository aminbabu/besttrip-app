/**
 * @file /schemas/settings/site/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 167 April, 2024
 */

// export site settings schemas
module.exports = {
    generalSettingsSchema: require('./general'),
    contactSettingsSchema: require('./contact'),
    policySettingsSchema: require('./policy'),
    metaSettingsSchema: require('./meta'),
};
