/**
 * @file controllers/dashboard/invoices/view-invoices.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const { Invoice } = require('../../../models');

// export invoice view controller
module.exports = async (req, res) => {
    try {
        // Lookup stage: Join with the Umrah bookings collection to get the bookingRefId
        const lookupBookingsStage = {
            $lookup: {
                from: 'umrahbookings',
                localField: 'bookingId',
                foreignField: '_id',
                as: 'booking',
            },
        };

        // Unwind the booking array
        const unwindBookingStage = {
            $unwind: '$booking',
        };

        // Lookup stage: Join with the Customers collection to get the customer name
        const lookupCustomersStage = {
            $lookup: {
                from: 'customers',
                localField: 'customer',
                foreignField: '_id',
                as: 'customer',
            },
        };

        // Unwind the customer array
        const unwindCustomerStage = {
            $unwind: '$customer',
        };

        // AddFields stage: Conditionally add bookingType field if bookingId exists in Umrah bookings
        const addFieldsStage = {
            $addFields: {
                bookingType: {
                    $cond: {
                        if: { $ne: ['$booking', null] },
                        then: 'Umrah Booking',
                        else: null,
                    },
                },
            },
        };
        /* 66c79e91fa348ff908e29393 */

        // Project stage: Select only the fields you want to display
        const projectStage = {
            $project: {
                invoiceId: 1,
                bookingRefId: '$booking.bookingRefId',
                customerName: '$customer.name',
                bookingType: 1,
                totalAmount: 1,
                createdAt: 1,
                updatedAt: 1,
            },
        };

        // Execute the aggregation pipeline
        const invoices = await Invoice.aggregate([
            lookupBookingsStage,
            unwindBookingStage,
            lookupCustomersStage,
            unwindCustomerStage,
            addFieldsStage,
            projectStage,
        ]);

        // return render view
        return res.render('dashboard/invoices', {
            title: 'Invoices',
            invoices,
        });
    } catch (error) {
        return res.redirect('/dashboard/error/500');
    }
};
