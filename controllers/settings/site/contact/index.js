/**
 * @file /controllers/settings/site/contact/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 13 April, 2024
 * @update_date 19 April, 2024
 */

// export contact settings controllers
module.exports = {
    getContactSettings: require('./get-contact-settings'),
    updateOrCreateContactSettings: require('./update-or-create-contact-settings'),
};
