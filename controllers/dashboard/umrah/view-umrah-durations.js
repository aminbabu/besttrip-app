/**
 * @file controllers/dashboard/umrah/view-umrah-durations.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const { UmrahPackageDuration } = require('../../../models');

// export umrah package duration view controller
module.exports = async (req, res) => {
    try {
        // get umrah package durations
        const umrahPackageDurations = await UmrahPackageDuration.find();

        // return render view
        return res.render('dashboard/umrah/durations', {
            title: 'Umrah Package Durations',
            user: req.user,
            umrahPackageDurations,
        });
    } catch (error) {
        return res.redirect('/error/500');
    }
};
