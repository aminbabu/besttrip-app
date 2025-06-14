/**
 * @file /schemas/mongoose/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 24 June, 2024
 */

// export all schemas
module.exports = {
    roleSchema: require('./role'),
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
    paymentRequestSchema: require('./payment-request'),
    umrahPackageSchema: require('./umrah/package'),
    travelerSchema: require('./umrah/traveler'),
    umrahPackageDurationSchema: require('./umrah/package-duration'),
    umrahPackageTypeSchema: require('./umrah/package-type'),
    loginHistorySchema: require('./login-history'),
    umrahBookingSchema: require('./umrah/booking'),
    invoiceSchema: require('./invoice'),
    generalLedgerSchema: require('./general-ledger'),
    walletSchema: require('./wallet'),
};
