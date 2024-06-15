/**
 * @file controllers/dashboard/umrah/types/view-umrah-types.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const { UmrahPackageType } = require('../../../../models');

// export umrah types view controller
module.exports = async (req, res) => {
    try {
        // get umrah package types
        const umrahPackageTypes = await UmrahPackageType.find();

        // return render view
        return res.render('dashboard/umrah/types', {
            title: 'Umrah Package Types',
            user: req.user,
            umrahPackageTypes,
        });
    } catch (error) {
        return res.redirect('/error/500');
    }
};
