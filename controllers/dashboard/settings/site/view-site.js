/**
 * @file controllers/dashboard/settings/site/view-site.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const {
    GeneralSettings,
    ContactSettings,
    PolicySettings,
    MetaSettings,
} = require('../../../../models');

// export site view controller
module.exports = async (req, res) => {
    try {
        // get general settings
        const general = await GeneralSettings.findOne();

        // get contact settings
        const contact = await ContactSettings.findOne();

        // get policies settings
        const policies = await PolicySettings.find();

        // get meta settings
        const meta = await MetaSettings.findOne();

        // render site view
        return res.render('dashboard/settings/site', {
            title: 'Site Settings',
            user: req.user,
            general,
            contact,
            policies,
            meta,
        });
    } catch (error) {
        return res.redirect('/error/500');
    }
};
