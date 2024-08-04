/**
 * @file controllers/dashboard/umrah/bookings/view-umrah-booking.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const { UmrahBooking } = require('../../../../models');

// export umrah bookings view controller
module.exports = async (req, res) => {
    try {
        // get status from request params
        const { status } = req.params;

        // Define matching stage
        const matchStage = {
            $match: { status },
        };

        // Define customer lookup stage
        const lookupCustomerStage = {
            $lookup: {
                from: 'customers',
                localField: 'customer',
                foreignField: '_id',
                as: 'customer',
            },
        };

        // Define customer unwind stage
        const unwindCustomerStage = {
            $unwind: {
                path: '$customer',
                preserveNullAndEmptyArrays: true,
            },
        };

        // Define umrah package lookup stage
        const lookupUmrahPackageStage = {
            $lookup: {
                from: 'umrahpackages',
                localField: 'umrahPackage',
                foreignField: '_id',
                as: 'umrahPackage',
            },
        };

        // Define umrah package unwind stage
        const unwindUmrahPackageStage = {
            $unwind: {
                path: '$umrahPackage',
                preserveNullAndEmptyArrays: true,
            },
        };

        // Define travelers lookup stage
        const lookupTravelersStage = {
            $lookup: {
                from: 'travelers',
                localField: '_id',
                foreignField: 'umrahBooking',
                as: 'travelers',
            },
        };

        // Define invoices lookup stage
        const lookupInvoicesStage = {
            $lookup: {
                from: 'invoices',
                localField: 'customer._id',
                foreignField: 'customer',
                as: 'invoiceDetails',
            },
        };

        // Define invoices unwind stage
        const unwindInvoicesStage = {
            $unwind: {
                path: '$invoiceDetails',
                preserveNullAndEmptyArrays: true,
            },
        };

        // Define result projection stage
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
                umrahPackage: {
                    _id: 1,
                    updatedAt: 1,
                    journeyDate: 1,
                },
                bookingRefId: 1,
                status: 1,
                travelers: {
                    passport: 1,
                    travelerPhoto: 1,
                    travelerNID: 1,
                    travelerCovidCertificate: 1,
                },
                invoiceDetails: {
                    _id: 1,
                    invoiceId: 1,
                    totalAmount: 1,
                    paidAmount: 1,
                    paymentType: 1,
                },
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
            lookupInvoicesStage,
            unwindInvoicesStage,
            projectStage,
        ]);

        // return render view
        return res.render(`dashboard/umrah/bookings/${status}`, {
            title: 'Umrah Bookings',
            umrahBookings: umrahBookingsWithTravelers,
        });
    } catch (error) {
        return res.redirect('/dashboard/error/500');
    }
};
