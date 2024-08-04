/**
 * @file controllers/api/umrah/bookings/get-umrah-booking-by-id-for-customers.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 31 July, 2024
 */

// dependencies
const mongoose = require('mongoose');
const { UmrahBooking } = require('../../../../models');

module.exports = async (req, res, next) => {
    try {
        // get ID from request params
        const { id } = req.params;

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(200).json({ message: 'Invalid ID format' });
        }

        // Define aggregation stages
        const matchStage = {
            $match: { _id: new mongoose.Types.ObjectId(id) },
        };

        const lookupCustomerStage = {
            $lookup: {
                from: 'customers',
                localField: 'customer',
                foreignField: '_id',
                as: 'customer',
            },
        };

        const unwindCustomerStage = {
            $unwind: {
                path: '$customer',
                preserveNullAndEmptyArrays: true,
            },
        };

        const lookupUmrahPackageStage = {
            $lookup: {
                from: 'umrahpackages',
                localField: 'umrahPackage',
                foreignField: '_id',
                as: 'umrahPackage',
            },
        };

        const unwindUmrahPackageStage = {
            $unwind: {
                path: '$umrahPackage',
                preserveNullAndEmptyArrays: true,
            },
        };

        const lookupTravelersStage = {
            $lookup: {
                from: 'travelers',
                localField: '_id',
                foreignField: 'umrahBooking',
                as: 'travelers',
            },
        };

        const projectStage = {
            $project: {
                _id: 1,
                customer: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    phone: 1,
                    role: 1,
                    isVerified: 1,
                    status: 1,
                    twoStepAuth: 1,
                    umrahBookings: 1,
                    paymentRequests: 1,
                    loginHistory: 1,
                    customerID: 1,
                    wallet: 1,
                },
                umrahPackage: 1,
                status: 1,
                travelers: 1,
            },
        };

        // Aggregate umrah bookings with travelers
        const umrahBookingsWithTravelers = await UmrahBooking.aggregate([
            matchStage,
            lookupCustomerStage,
            unwindCustomerStage,
            lookupUmrahPackageStage,
            unwindUmrahPackageStage,
            lookupTravelersStage,
            projectStage,
        ]);

        if (umrahBookingsWithTravelers.length === 0) {
            return res
                .status(200)
                .json({ message: 'No data found for the given ID' });
        }

        // Return bookings with travelers
        return res.status(200).json({
            message: 'Data retrieved successfully',
            umrahBookings: umrahBookingsWithTravelers[0],
        });
    } catch (error) {
        // Pass the error to the error-handling middleware
        return next(error);
    }
};
