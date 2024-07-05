/**
 * @file controllers/dashboard/settings/site/view-site.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 03 Jul, 2024
 */

// dependencies
const {
    GeneralSettings,
    ContactSettings,
    PolicySettings,
    MetaSettings,
} = require('../../../../models');
const moment = require('moment');

// export site view controller
module.exports = async (req, res) => {
    try {
        // get general settings
        const general = await GeneralSettings.findOne();

        // get contact settings
        const contact = await ContactSettings.findOne();

        // get policies settings
        const policies = await PolicySettings.findOne();

        // get meta settings
        let meta = await MetaSettings.find();

        // format meta created at date
        meta = meta.map((item) => {
            const modifiedItem = { ...item.toObject() };

            modifiedItem.createdAt = moment(modifiedItem.createdAt).format(
                'DD MMM, YYYY, h:mm:ss a'
            );

            return (item = modifiedItem);
        });

        // render site view
        return res.render('dashboard/settings/site', {
            title: 'Site Settings',
            general,
            contact,
            policies,
            meta,
        });
    } catch (error) {
        return res.redirect('/dashboard/error/500');
    }
};
