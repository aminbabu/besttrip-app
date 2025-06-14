/**
 * @file /models/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 21 June, 2024
 */

// export all models
module.exports = {
    Role: require('./role'),
    User: require('./user'),
    Token: require('./token'),
    Customer: require('./customer'),
    GeneralSettings: require('./settings/site/general'),
    ContactSettings: require('./settings/site/contact'),
    PolicySettings: require('./settings/site/policy'),
    MetaSettings: require('./settings/site/meta'),
    PaymentSettings: require('./settings/payment'),
    SectionSettings: require('./settings/content/section'),
    ExclusiveOffer: require('./settings/content/exclusive-offer'),
    HotelOffer: require('./settings/content/hotel-offer'),
    FlightOffer: require('./settings/content/flight-offer'),
    UmrahOffer: require('./settings/content/umrah-offer'),
    BlogPost: require('./settings/content/blog-post'),
    ThemeSettings: require('./settings/theme'),
    PaymentRequest: require('./payment-request'),
    UmrahPackage: require('./umrah/package'),
    Traveler: require('./umrah/traveler'),
    UmrahPackageDuration: require('./umrah/package-duration'),
    UmrahPackageType: require('./umrah/package-type'),
    LoginHistory: require('./login-history'),
    UmrahBooking: require('./umrah/booking'),
    Invoice: require('./invoice'),
    GeneralLedger: require('./general-ledger'),
    Wallet: require('./wallet'),
};
