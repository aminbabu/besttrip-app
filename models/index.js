/**
 * @file /models/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 19 April, 2024
 */

// export all models
module.exports = {
    User: require('./user'),
    Token: require('./token'),
    Customer: require('./customer'),
    GeneralSettings: require('./settings/site/general'),
    ContactSettings: require('./settings/site/contact'),
    PolicySettings: require('./settings/site/policy'),
    MetaSettings: require('./settings/site/meta'),
    PaymentsSettings: require('./settings/payments'),
    ContentSectionsSettings: require('./settings/content/sections'),
    ContentExclusiveOffers: require('./settings/content/exclusive-offer'),
};
