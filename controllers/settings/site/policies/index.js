/**
 * @file /controllers/settings/site/policies/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 14 April, 2024
 */

// export site policies settings controllers
module.exports = {
    getAboutUs: require('./get-about-us'),
    getTermsOfConditions: require('./get-terms-of-conditions'),
    getReturnPolicy: require('./get-return-policy'),
    getPrivacyPolicy: require('./get-privacy-policy'),
    updatePolicies: require('./update-policies'),
};
