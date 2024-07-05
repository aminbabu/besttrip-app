/**
 * @file controllers/dashboard/umrah/durations/view-umrah-durations.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const { UmrahPackageDuration } = require('../../../../models');

// export umrah package durations view controller
module.exports = async (req, res) => {
    try {
        // get umrah package durations
        const umrahPackageDurations = await UmrahPackageDuration.find();

        // return render view
        return res.render('dashboard/umrah/durations', {
            title: 'Umrah Package Durations',
            umrahPackageDurations,
        });
    } catch (error) {
        return res.redirect('/dashboard/error/500');
    }
};
