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
            status: 'active',
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

        // Check if adding more travelers exceeds the booking's total allowed travelers
        if (listedTravelers.length >= listedUmrah.totalTravelers) {
            return res.status(403).send({
                message: `You cannot add more than ${listedUmrah.totalTravelers} travelers to this package.`,
            });
        }

        // Ensure there is at least one adult traveler before adding a non-adult traveler
        const adultTravelerExists = listedTravelers.some(
            (traveler) => traveler.travelerType === 'adult'
        );

        // Check if the first traveler is being added, or if there are travelers but no adults
        if (
            (listedTravelers.length === 0 || !adultTravelerExists) &&
            validatedData.travelerType !== 'adult'
        ) {
            return res.status(403).send({
                message: 'The first traveler added must be an adult.',
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
            if (validatedData.travelerType === 'adult') {
                // if (!listedUmrah.adultTravelers < 0) {
                //     listedUmrah.set({
                //         adultTravelers: listedUmrah.adultTravelers - 1,
                //     });
                // }
                await UmrahBooking.findOneAndUpdate(
                    {
                        _id: validatedData.umrahBooking,
                        customer:
                            req.user.role === 'admin'
                                ? validatedData.customerId
                                : req.user._id,
                    },
                    { $set: { adultTravelers: listedUmrah.adultTravelers - 1 } }
                );
            }
            if (validatedData.travelerType === 'child') {
                // if (!listedUmrah.childTravelers < 0) {
                //     listedUmrah.set({
                //         childTravelers: listedUmrah.childTravelers - 1,
                //     });
                // }
                await UmrahBooking.findOneAndUpdate(
                    {
                        _id: validatedData.umrahBooking,
                        customer:
                            req.user.role === 'admin'
                                ? validatedData.customerId
                                : req.user._id,
                    },
                    { $set: { childTravelers: listedUmrah.childTravelers - 1 } }
                );
            }
            if (validatedData.travelerType === 'infant') {
                // if (!listedUmrah.infantTravelers < 0) {
                //     listedUmrah.set({
                //         infantTravelers: listedUmrah.infantTravelers - 1,
                //     });
                // }
                await UmrahBooking.findOneAndUpdate(
                    {
                        _id: validatedData.umrahBooking,
                        customer:
                            req.user.role === 'admin'
                                ? validatedData.customerId
                                : req.user._id,
                    },
                    {
                        $set: {
                            infantTravelers: listedUmrah.infantTravelers - 1,
                        },
                    }
                );
            }
            await listedUmrah.save();
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
