/**
 * @file controllers/dashboard/umrah/packages/view-umrah-packages.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const { UmrahPackage } = require('../../../../models');

// export umrah packages view controller
module.exports = async (req, res) => {
    try {
        // get umrah packages
        const umrahPackages = await UmrahPackage.find();

        // return render view
        return res.render('dashboard/umrah/packages', {
            title: 'Umrah Packages',
            umrahPackages,
        });
    } catch (error) {
        return res.redirect('/error/500');
    }
};
