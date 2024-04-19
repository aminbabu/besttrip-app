/**
 * @file /middlewares/validate/settings/content/sections/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 17 April, 2024
 */

// export content sections settings validator middlewares
module.exports = {
    validateContentSectionId: require('./validate-content-section-id'),
    validateContentSection: require('./validate-content-section'),
};
