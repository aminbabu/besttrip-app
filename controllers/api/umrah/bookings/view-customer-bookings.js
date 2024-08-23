/**
 * @file controllers/api/umrah/bookings/view-customer-booking.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 31 July, 2024
 */

// dependencies
const {
    UMRAH_BOOKING_STATUS,
} = require('../../../../constants/umrah-bookings');
const { UmrahBooking } = require('../../../../models');

// export umrah bookings view controller
module.exports = async (req, res, next) => {
    try {
        // Match documents where the customer field matches the current user's ID
        const matchCustomerBookings = {
            $match: { customer: req.user._id },
        };

        // Perform a left outer join with the `umrahpackages` collection to include umrah package details.
        const lookupUmrahPackage = {
            $lookup: {
                from: 'umrahpackages',
                localField: 'umrahPackage',
                foreignField: '_id',
                as: 'umrahPackage',
            },
        };

        // Flatten the `umrahPackage` array to include a single `umrahPackage` object in each document.
        const unwindUmrahPackage = {
            $unwind: {
                path: '$umrahPackage',
                preserveNullAndEmptyArrays: true,
            },
        };

        // Add a new field `statusOrder` that contains the index of the booking status in the `UMRAH_BOOKING_STATUS` array.
        const addStatusOrderField = {
            $addFields: {
                statusOrder: {
                    $indexOfArray: [UMRAH_BOOKING_STATUS, '$status'],
                },
            },
        };

        //  Sort the documents by the `statusOrder` field in ascending order.
        const sortByStatusOrder = {
            $sort: { statusOrder: 1 },
        };

        // Define travelers lookup stage to get co-responding travelers data
        const lookupTravelersStage = {
            $lookup: {
                from: 'travelers',
                localField: '_id',
                foreignField: 'umrahBooking',
                as: 'travelers',
            },
        };

        // Add the `bookingType` field to each document
        const addBookingTypeField = {
            $addFields: {
                bookingType: 'Umrah Package',
            },
        };

        //  Exclude the `statusOrder` field from the final output to keep the response clean.
        const projectWithoutStatusOrder = {
            $project: { statusOrder: 0 },
        };

        // Aggregate umrah bookings using the defined stages
        const umrahBookings = await UmrahBooking.aggregate([
            matchCustomerBookings,
            lookupUmrahPackage,
            unwindUmrahPackage,
            addStatusOrderField,
            lookupTravelersStage,
            sortByStatusOrder,
            addBookingTypeField,
            projectWithoutStatusOrder,
        ]);

        // return bookings
        return res.status(200).json({
            message: 'Data retrieved successfully',
            umrahBookings,
        });
    } catch (error) {
        return next(error);
    }
};
