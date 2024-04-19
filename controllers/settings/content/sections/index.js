/**
 * @file /controllers/settings/content/sections/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 19 April, 2024
 */

// export section content settings controllers
module.exports = {
    getSections: require('./get-sections'),
    getSection: require('./get-section'),
    updateOrCreateSection: require('./update-or-create-section'),
};
