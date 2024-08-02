/**
 * @file controllers/api/umrah/bookings/delete-umrah-booking-for-customer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 31 July, 2024
 */

// dependencies
const path = require('path');
const fs = require('fs/promises');
const mongoose = require('mongoose');
const { UmrahBooking, Traveler, Invoice } = require('../../../../models');
const {
    UMRAH_BOOKING_STATUS,
} = require('../../../../constants/umrah-bookings');

module.exports = async (req, res, next) => {
    try {
        // Extract booking ID from request params
        const { id } = req.params;

        // Check if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(200).json({
                success: false,
                message: 'Invalid booking ID.',
            });
        }

        // Fetch the Umrah booking by ID
        const umrahBooking = await UmrahBooking.findOne({ _id: id });

        // Check if the booking status prohibits deletion
        if (
            [
                UMRAH_BOOKING_STATUS[1],
                UMRAH_BOOKING_STATUS[2],
                UMRAH_BOOKING_STATUS[3],
                UMRAH_BOOKING_STATUS[4],
            ].includes(umrahBooking.status)
        ) {
            return res.status(200).json({
                message: `You can't delete this booking cause it is already ${umrahBooking.status}`,
            });
        }

        // Aggregate to find travelers associated with the Umrah booking
        const travelers = await Traveler.aggregate([
            {
                $match: {
                    umrahBooking: new mongoose.Types.ObjectId(id),
                    createdBy: new mongoose.Types.ObjectId(req.user._id),
                },
            },
            {
                $project: {
                    _id: 1,
                    passport: 1,
                    travelerPhoto: 1,
                    travelerNID: 1,
                    travelerCovidCertificate: 1,
                },
            },
        ]);

        // Check if any travelers are found
        if (travelers.length === 0) {
            return res.status(200).json({
                success: false,
                message: 'No travelers found for this Umrah booking.',
            });
        }

        // Collect image deletion promises
        const deleteImagePromises = travelers.flatMap((traveler) => {
            const imagePaths = [
                traveler.passport,
                traveler.travelerPhoto,
                traveler.travelerNID,
                traveler.travelerCovidCertificate,
            ];

            return imagePaths
                .filter((filePath) => filePath) // Filter out undefined or null file paths
                .map((filePath) => {
                    const fullPath = path.join(
                        __dirname,
                        './../../../../public',
                        filePath
                    );

                    return fs.unlink(fullPath).catch((error) => {
                        // Log error but continue with the next file
                        console.error(
                            `Error deleting file ${fullPath}:`,
                            error
                        );
                    });
                });
        });

        // Wait for all image deletions to complete
        await Promise.all(deleteImagePromises);

        // Delete travelers from the database
        await Traveler.deleteMany({
            umrahBooking: id,
            createdBy: req.user._id,
        });

        // Delete the Umrah booking from the database
        await UmrahBooking.findOneAndDelete({
            _id: id,
            customer: req.user._id,
        });

        // Delete the invoice from the database
        await Invoice.findOneAndDelete({
            bookingId: id,
            customer: req.user._id,
        });

        // Return success response
        return res.status(200).json({
            message:
                'Umrah booking and associated travelers deleted successfully.',
        });
    } catch (error) {
        // Pass the error to the error-handling middleware
        return next(error);
    }
};
