/**
 * @file /middlewares/validate/settings/content/sections/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 19 April, 2024
 */

// export content sections settings validator middlewares
module.exports = {
    validateContentSectionKey: require('./validate-content-section-key'),
    validateContentSection: require('./validate-content-section'),
};
