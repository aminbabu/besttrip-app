/**
 * @file controllers/dashboard/umrah/view-add-umrah-package.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// export umrah package add view controller
module.exports = async (req, res) => {
    try {
        // return render view
        return res.render('dashboard/umrah/packages/add', {
            title: 'Add Umrah Package',
            user: req.user,
        });
    } catch (error) {
        return res.redirect('/error/500');
    }
};
