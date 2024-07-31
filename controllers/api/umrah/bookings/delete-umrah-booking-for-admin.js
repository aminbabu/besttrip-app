/**
 * @file controllers/api/umrah/bookings/delete-umrah-booking-for-admin.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 31 July, 2024
 */

// dependencies
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const { UmrahBooking, Traveler } = require('../../../../models');

/**
 * @description Delete an Umrah booking and its corresponding travelers for admin.
 * @param {Object} req - The request object containing the booking ID in params.
 * @param {Object} res - The response object to send the result or error.
 * @param {Function} next - The next middleware function in the stack.
 */
module.exports = async (req, res, next) => {
    try {
        // Extract booking ID from request params
        const { id } = req.params;

        // Check if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid booking ID.',
            });
        }

        // Aggregate to find travelers associated with the Umrah booking
        const travelers = await Traveler.aggregate([
            { $match: { umrahBooking: new mongoose.Types.ObjectId(id) } },
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
            return res.status(404).json({
                success: false,
                message: 'No travelers found for this Umrah booking.',
            });
        }

        // Delete each traveler's images from the file system
        for (const traveler of travelers) {
            const imagePaths = [
                traveler.passport,
                traveler.travelerPhoto,
                traveler.travelerNID,
                traveler.travelerCovidCertificate,
            ];

            for (const filePath of imagePaths) {
                if (filePath) {
                    const fullPath = path.resolve(
                        __dirname,
                        './../../../../public',
                        filePath
                    );
                    try {
                        if (fs.existsSync(fullPath)) {
                            fs.unlinkSync(fullPath);
                        }
                    } catch (error) {
                        // Log error and continue with the next file
                        console.error(
                            `Error deleting file ${fullPath}:`,
                            error
                        );
                    }
                }
            }
        }

        // Delete travelers from the database
        await Traveler.deleteMany({ umrahBooking: id });

        // Delete the Umrah booking from the database
        await UmrahBooking.findByIdAndDelete(id);

        // Return success response
        return res.status(200).json({
            success: true,
            message:
                'Umrah booking and associated travelers deleted successfully.',
        });
    } catch (error) {
        // Pass the error to the error-handling middleware
        return next(error);
    }
};
