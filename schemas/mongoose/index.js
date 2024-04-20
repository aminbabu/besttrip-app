/**
 * @file /schemas/mongoose/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 20 April, 2024
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
    paymentSettingsSchema: require('./settings/payment'),
    sectionSettingsSchema: require('./settings/content/section'),
    exclusiveOfferSchema: require('./settings/content/exclusive-offer'),
    hotelOfferSchema: require('./settings/content/hotel-offer'),
    flightOfferSchema: require('./settings/content/flight-offer'),
    umrahOfferSchema: require('./settings/content/umrah-offer'),
    blogPostSchema: require('./settings/content/blog-post'),
    themeSettingsSchema: require('./settings/theme'),
};
