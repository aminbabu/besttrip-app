/**
 * @file /controllers/api/umrah/traveler/delete-traveler-by-id.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 03 Jul, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
const { Traveler, UmrahBooking } = require('../../../../models');
const {
    UMRAH_BOOKING_STATUS,
} = require('../../../../constants/umrah-bookings');

// export delete traveler controller
module.exports = async (req, res, next) => {
    try {
        const { travelerId, umrahBookingId } = req.params;

        const umrahBooking = await UmrahBooking.findById(umrahBookingId);

        // Check if the booking status allows deletion
        if (UMRAH_BOOKING_STATUS[0] !== umrahBooking.status) {
            return res.status(400).send({
                message:
                    'Cannot delete traveler as the booking status does not allow it',
            });
        }

        // get traveler
        const traveler = await Traveler.findOne({
            _id: travelerId,
            umrahBooking: umrahBookingId,
        });

        // check if traveler exists
        if (!traveler) {
            return res.status(404).send({
                message: 'Traveler not found',
            });
        }

        // delete traveler
        await traveler.deleteOne();

        // delete traveler passport
        if (traveler?.passport) {
            fs.unlinkSync(
                path.join(__dirname, './../../../../public', traveler.passport)
            );
        }

        // delete traveler photo
        if (traveler?.travelerPhoto) {
            fs.unlinkSync(
                path.join(
                    __dirname,
                    './../../../../public',
                    traveler.travelerPhoto
                )
            );
        }

        // delete traveler NID
        if (traveler?.travelerNID) {
            fs.unlinkSync(
                path.join(
                    __dirname,
                    './../../../../public',
                    traveler.travelerNID
                )
            );
        }
        // delete traveler covid certificate
        if (traveler?.travelerCovidCertificate) {
            fs.unlinkSync(
                path.join(
                    __dirname,
                    './../../../../public',
                    traveler.travelerCovidCertificate
                )
            );
        }

        // send response
        return res.status(200).send({
            message: 'Deleted traveler successfully',
            traveler,
        });
    } catch (error) {
        return next(error);
    }
};
