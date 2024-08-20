/**
 * @file /controllers/api/umrah/traveler/create-traveler.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 08 May, 2024
 */

const {
    UMRAH_BOOKING_STATUS,
} = require('../../../../constants/umrah-bookings');
const { Traveler, UmrahBooking, UmrahPackage } = require('../../../../models');

// export create traveler controller
module.exports = async (req, res, next) => {
    try {
        // Get validated data
        const validatedData = req.body;
        const {
            passport,
            travelerPhoto,
            travelerNID,
            travelerCovidCertificate,
        } = req.files || {};

        // Find the Umrah booking associated with the traveler
        const listedUmrah = await UmrahBooking.findOne({
            _id: validatedData.umrahBooking,
            customer:
                req.user.role === 'admin'
                    ? validatedData.customerId
                    : req.user._id,
        });

        // Validate if listedUmrah is found
        if (!listedUmrah) {
            return res.status(404).send({
                message: 'Umrah Booked Package not found',
            });
        }

        // Find the associated Umrah package details
        const availableUmrahDetails = await UmrahPackage.findOne({
            _id: listedUmrah.umrahPackage,
        });

        // Validate if availableUmrahDetails is found
        if (!availableUmrahDetails) {
            return res.status(404).send({
                message: 'Umrah Package Details not found',
            });
        }

        // Find the travelers associated with the current booking
        const listedTravelers = await Traveler.find({
            createdBy:
                req.user.role === 'admin'
                    ? validatedData.customerId
                    : req.user._id,
            umrahBooking: listedUmrah._id,
        });

        // Ensure travelers exist for this booking
        if (!listedTravelers) {
            return res.status(404).send({
                message: 'Travelers not found',
            });
        }

        // Check if adding more travelers exceeds the booking's total allowed travelers
        if (listedTravelers.length >= listedUmrah.totalTravelers) {
            return res.status(403).send({
                message: `You cannot add more than ${listedUmrah.totalTravelers} travelers to this package.`,
            });
        }

        // Customer can't add more travelers if the package is already 'pending' || 'in-process' || 'under-review' || 'success' || 'booked' || 'cancelled', but admin can
        if (
            req.user.role === 'admin' ||
            listedUmrah.status === UMRAH_BOOKING_STATUS[0]
        ) {
            // Create the traveler object
            const travelerData = {
                ...validatedData,
                passport: passport.path,
                travelerPhoto: travelerPhoto.path,
                travelerNID: travelerNID.path,
                travelerCovidCertificate: travelerCovidCertificate.path,
                createdBy:
                    req.user.role === 'admin'
                        ? validatedData.customerId
                        : req.user._id,
            };

            // Save the new traveler to the database
            const traveler = new Traveler(travelerData);
            await traveler.save();

            // Return success response
            return res.status(201).send({
                message: 'Traveler created successfully',
                traveler,
            });
        } else {
            return res.status(403).send({
                message: `You can't add more travelers to this package because its status is ${listedUmrah.status}.`,
            });
        }
    } catch (error) {
        return next(error);
    }
};
