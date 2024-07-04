/**
 * @file controllers/dashboard/settings/content/sections/view-sections.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 03 Jul, 2024
 */

// dependencies
const { SectionSettings } = require('../../../../../models');

// export sections view controller
module.exports = async (req, res) => {
    try {
        // get sections
        const sections = await SectionSettings.find();

        const hotelSection = sections.find(
            (section) => section.key === 'hotels'
        );
        const destinationSection = sections.find(
            (section) => section.key === 'destinations'
        );
        const umrahZiyarahSection = sections.find(
            (section) => section.key === 'umrah-ziyarah'
        );
        const beautifulPlacesSection = sections.find(
            (section) => section.key === 'beautiful-places'
        );

        console.log(
            hotelSection,
            destinationSection,
            umrahZiyarahSection,
            beautifulPlacesSection
        );

        // render sections view
        return res.render('dashboard/settings/content/sections', {
            title: 'Sections',
            hotelSection,
            destinationSection,
            umrahZiyarahSection,
            beautifulPlacesSection,
        });
    } catch (error) {
        return res.redirect('/error/500');
    }
};
