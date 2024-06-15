/**
 * @file controllers/dashboard/settings/content/sections/view-sections.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const { SectionSettings } = require('../../../../../models');

// export sections view controller
module.exports = async (req, res) => {
    try {
        // get sections
        const sections = await SectionSettings.find();

        // render sections view
        return res.render('dashboard/settings/content/sections', {
            title: 'Sections',
            user: req.user,
            sections,
        });
    } catch (error) {
        return res.redirect('/error/500');
    }
};
