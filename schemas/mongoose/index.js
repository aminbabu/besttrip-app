/**
 * @file /schemas/mongoose/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 19 April, 2024
 */

// export all schemas
module.exports = {
    userSchema: require('./user'),
    customerSchema: require('./customer'),
    tokenSchema: require('./token'),
    generalSettingsSchema: require('./settings/site/general'),
    contactSettingsSchema: require('./settings/site/contact'),
    policySettingsSchema: require('./settings/site/policy'),
    metaSettingsSchema: require('./settings/site/meta'),
    paymentsSettingsSchema: require('./settings/payments'),
    contentSectionsSettingsSchema: require('./settings/content/sections'),
};
