/**
 * @file controllers/dashboard/umrah/bookings/view-umrah-booking.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const { UmrahBooking } = require('../../../../models');

// export umrah bookings view controller
module.exports = async (req, res) => {
    try {
        // get status from request params
        const { status } = req.params;

        // get umrah bookings
        const umrahBookings = await UmrahBooking.find({ status }).populate(
            'customer'
        );

        // return render view
        return res.render(`dashboard/umrah/booking/${status}`, {
            title: 'Umrah Bookings',
            umrahBookings,
        });
    } catch (error) {
        return res.redirect('/dashboard/error/500');
    }
};
