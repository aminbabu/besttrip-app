/**
 * @file controllers/api/umrah/bookings/update-umrah-booking-status-for-admin.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 July, 2024
 */

// dependencies
const { UmrahBooking } = require('../../../../models');

// export umrah bookings status view controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;
        const { status } = req.body;

        // get umrah booking
        const umrahBooking = await UmrahBooking.findById(id);

        // check if umrah booking exists
        if (!umrahBooking) {
            return res.status(404).send({
                message: 'Umrah booking not found',
            });
        }

        // update umrah booking
        umrahBooking.set({ status });

        // save umrah booking
        await umrahBooking.save();

        // send response
        return res.status(200).send({
            message: 'Updated umrah booking status successfully',
            umrahBooking,
        });
    } catch (error) {
        return next(error);
    }
};
