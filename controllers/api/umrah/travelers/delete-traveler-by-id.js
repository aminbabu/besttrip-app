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
const { Traveler } = require('../../../../models');

// export delete traveler controller
module.exports = async (req, res, next) => {
    try {
        const { travelerId, umrahBookingId } = req.params;

        // get traveler
        const traveler = await Traveler.findOne({
            _id: travelerId,
            umrahBooking: umrahBookingId,
        });

        // check if traveler exists
        if (!traveler) {
            return res.status(200).send({
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
