/**
 * @file /controllers/settings/site/contact/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 13 April, 2024
 * @update_date 17 April, 2024
 */

// export contact settings controllers
module.exports = {
    getContactSettings: require('./get-contact-settings'),
    createContactSettings: require('./create-contact-settings'),
    updateContactSettings: require('./update-contact-settings'),
};
