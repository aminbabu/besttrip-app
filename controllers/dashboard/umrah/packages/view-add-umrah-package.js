/**
 * @file controllers/dashboard/umrah/packages/view-add-umrah-package.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

const {
    UmrahPackageDuration,
    UmrahPackageType,
} = require('./../../../../models');

// export umrah package add view controller
module.exports = async (req, res) => {
    try {
        const umrahPackageDurations = await UmrahPackageDuration.find({
            status: 'active',
        });

        const umrahPackageTypes = await UmrahPackageType.find({
            status: 'active',
        });

        // return render view
        return res.render('dashboard/umrah/packages/add', {
            title: 'Add Umrah Package',
            umrahPackageDurations,
            umrahPackageTypes,
        });
    } catch (error) {
        return res.redirect('/dashboard/error/500');
    }
};
