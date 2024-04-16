/**
 * @file /middlewares/validators/settings/site/policy/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 16 April, 2024
 */

// export policy settings validators
module.exports = {
    validatePolicySettingsKey: require('./validate-policy-settings-key'),
    validatePolicySettings: require('./validate-policy-settings'),
};
