/**
 * @file controllers/dashboard/settings/content/umrah-offers/view-umrah-offers.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const { UmrahOffer, UmrahPackageDuration } = require('../../../../../models');

// export umrah offers view controller
module.exports = async (req, res) => {
    try {
        // get umrah offers
        const umrahOffers = await UmrahOffer.find();
        const umrahPackageDurations = await UmrahPackageDuration.find({
            status: 'active',
        });

        // render umrah offers view
        return res.render('dashboard/settings/content/umrah-offers', {
            title: 'Umrah Offers',
            umrahOffers,
            umrahPackageDurations,
        });
    } catch (error) {
        return res.redirect('/error/500');
    }
};
