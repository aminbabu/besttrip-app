/**
 * @file /controllers/api/umrah/traveler/update-traveler.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 08 May, 2024
 */

const {
    UMRAH_BOOKING_STATUS,
} = require('../../../../constants/umrah-bookings');
const { Traveler, UmrahBooking } = require('./../../../../models');

// dependencies

// export traveler update controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { umrahBookingId, travelerId } = req.params;

        const validatedData = req.body;
        const {
            passport,
            travelerPhoto,
            travelerNID,
            travelerCovidCertificate,
        } = req.files;

        const listedUmraStatus = await UmrahBooking.findOne({
            _id: req.params.umrahBookingId,
            customer:
                req.user.role === 'admin'
                    ? validatedData.customerId
                    : req.user._id,
        });

        // customer can't update any more travelers if the package is already 'in-process' || 'under-review' || 'success' || 'booked' || 'cancelled' but admin can
        if (
            req.user.role === 'admin' ||
            listedUmraStatus.status === UMRAH_BOOKING_STATUS[0]
        ) {
            const traveler = await Traveler.findOne({
                _id: travelerId,
                createdBy:
                    req.user.role === 'admin'
                        ? validatedData.customerId
                        : req.user._id,
            });

            // check if traveler exists
            if (!traveler) {
                return res.status(404).send({
                    message: 'Traveler not found',
                });
            }
            // update traveler
            traveler.set({
                ...validatedData,
                passport: passport?.path || traveler.passport,
                travelerPhoto: travelerPhoto?.path || traveler.travelerPhoto,
                travelerNID: travelerNID?.path || traveler.travelerNID,
                travelerCovidCertificate:
                    travelerCovidCertificate?.path ||
                    traveler.travelerCovidCertificate,
            });

            // save traveler
            await traveler.save();

            // send traveler
            return res.status(200).send({
                message: 'Traveler info updated successfully',
                traveler,
            });
        } else {
            return res.status(403).send({
                message: `You can't update any travelers details to this package cause this package ${listedUmraStatus.status}`,
            });
        }
    } catch (error) {
        return next(error);
    }
};
