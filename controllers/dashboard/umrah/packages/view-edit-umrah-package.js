/**
 * @file controllers/dashboard/umrah/packages/view-edit-umrah-package.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 22 June, 2024
 */

// dependencies
const { UmrahPackage } = require('../../../../models');

// export umrah package edit view controller
module.exports = async (req, res) => {
    try {
        // get id from request params
        const { id } = req.params;

        // get umrah package
        const umrahPackage = await UmrahPackage.findById(id);

        // check if umrah package not found
        if (!umrahPackage) {
            return res.redirect('/dashboard/errors/404');
        }

        // return render view
        return res.render('dashboard/umrah/packages/edit', {
            title: 'Edit Umrah Package',
            umrahPackage,
        });
    } catch (error) {
        return res.redirect('/error/500');
    }
};
