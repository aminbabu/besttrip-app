/**
 * @file controllers/dashboard/customers/view-customer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 June, 2024
 * @update_date 05 Jul, 2024
 */

// dependencies
const moment = require('moment');
const mongoose = require('mongoose');
const {
    Customer,
    PaymentRequest,
    Invoice,
    UmrahBooking,
} = require('../../../models');
const { countries } = require('countries-list');
const prepareRoleDefination = require('../../../utils/global/prepare-role-defination');
const { currencyFormatter } = require('../../../utils/global');
const { ObjectId } = mongoose.Types;

// export customer view controller
module.exports = async (req, res) => {
    try {
        // get customer id from request params
        const { id } = req.params;

        // Get customer by ID with wallet details
        const existingCustomer = await Customer.findById(id).populate({
            path: 'wallet',
        });

        // Check if customer exists
        if (!existingCustomer) {
            return res.redirect('/dashboard/error/404');
        }

        const customer = existingCustomer.toObject();

        // Format customer dates
        if (customer.createdAt) {
            customer.createdAt = moment(customer.createdAt).format(
                'DD MMM YYYY, h:mm a'
            );
        }
        if (customer.updatedAt) {
            customer.updatedAt = moment(customer.updatedAt).format(
                'DD MMM YYYY, h:mm a'
            );
        }
        if (customer.dob) {
            customer.dob = moment(customer.dob).format('DD MMM YYYY');
        }

        // Fetch payment requests for the customer
        const paymentRequests = await PaymentRequest.find({
            customer: id,
        }).sort({ createdAt: -1 }); // Sort by creation date in descending order

        // Format payment request dates
        paymentRequests.forEach((request) => {
            if (request.createdAt) {
                request.createdAt = moment(request.createdAt).format(
                    'DD MMM YYYY, h:mm a'
                );
            }
        });

        // Invoice Aggregation Pipeline Stages

        // Stage 1: Match invoices by customer ID
        const matchInvoiceStage = {
            $match: { customer: new mongoose.Types.ObjectId(id) },
        };

        // Stage 2: Sort invoices by creation date in descending order
        const sortInvoiceStage = {
            $sort: { createdAt: -1 },
        };

        // Stage 3: Lookup umrah bookings to get booking details
        const lookupBookingStage = {
            $lookup: {
                from: 'umrahbookings',
                localField: 'bookingId',
                foreignField: '_id',
                as: 'bookingDetails',
            },
        };

        // Stage 4: Unwind the bookingDetails array to deconstruct it
        const unwindBookingStage = {
            $unwind: {
                path: '$bookingDetails',
                preserveNullAndEmptyArrays: true,
            },
        };

        // Stage 5: Lookup customers to get customer details
        const lookupCustomerStage = {
            $lookup: {
                from: 'customers',
                localField: 'customer',
                foreignField: '_id',
                as: 'customerDetails',
            },
        };

        // Stage 6: Unwind the customerDetails array to deconstruct it
        const unwindCustomerStage = {
            $unwind: {
                path: '$customerDetails',
                preserveNullAndEmptyArrays: true,
            },
        };

        // Stage 7: Project the desired fields for each invoice
        const projectInvoiceStage = {
            $project: {
                _id: 1,
                amount: 1,
                account: 1,
                bookingId: {
                    $ifNull: ['$bookingDetails.bookingRefId', ''],
                },
                totalAmount: 1,
                paymentType: 1,
                partialPaymentExpiryDate: 1,
                paidAmount: 1,
                invoiceId: 1,
                partialPaymentRestAmount: 1,
                customer: {
                    $ifNull: ['$customerDetails.name', ''],
                },
                createdAt: 1,
                updatedAt: 1,
            },
        };

        // Aggregate invoices with umrah bookings
        const invoices = await Invoice.aggregate([
            matchInvoiceStage,
            sortInvoiceStage,
            lookupBookingStage,
            unwindBookingStage,
            lookupCustomerStage,
            unwindCustomerStage,
            projectInvoiceStage,
        ]);

        // Umrah Booking Aggregation Pipeline Stages

        // Stage 1: Match umrah bookings by customer ID
        const matchUmrahBookingStage = {
            $match: { customer: new mongoose.Types.ObjectId(id) },
        };

        // Stage 2: Sort umrah bookings by creation date in descending order
        const sortUmrahBookingStage = {
            $sort: { createdAt: -1 },
        };

        // Stage 3: Lookup umrah packages to get package details
        const lookupUmrahPackageStage = {
            $lookup: {
                from: 'umrahpackages',
                localField: 'umrahPackage',
                foreignField: '_id',
                as: 'umrahPackageDetails',
            },
        };

        // Stage 4: Unwind the umrahPackageDetails array to deconstruct it
        const unwindUmrahPackageStage = {
            $unwind: {
                path: '$umrahPackageDetails',
                preserveNullAndEmptyArrays: true,
            },
        };

        // Stage 5: Lookup travelers to count the total number of travelers per booking
        const lookupTravelerCountStage = {
            $lookup: {
                from: 'travelers',
                let: { bookingId: '$_id' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ['$umrahBooking', '$$bookingId'],
                            },
                        },
                    },
                    { $count: 'totalTravelerCount' },
                ],
                as: 'travelerCount',
            },
        };

        // Stage 6: Add totalTravelerCount to the output
        const addFieldsTravelerCountStage = {
            $addFields: {
                totalTravelerCount: {
                    $ifNull: [
                        {
                            $arrayElemAt: [
                                '$travelerCount.totalTravelerCount',
                                0,
                            ],
                        },
                        0,
                    ],
                },
            },
        };

        // Stage 7: Lookup invoices to get the totalAmount for each booking
        const lookupInvoiceDetailsStage = {
            $lookup: {
                from: 'invoices',
                let: { bookingId: '$_id' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ['$bookingId', '$$bookingId'] },
                        },
                    },
                    { $project: { _id: 0, totalAmount: 1 } },
                ],
                as: 'invoiceDetails',
            },
        };

        // Stage 8: Add totalAmount from invoice details to the output
        const addFieldsAmountStage = {
            $addFields: {
                totalAmount: {
                    $ifNull: [
                        {
                            $arrayElemAt: ['$invoiceDetails.totalAmount', 0],
                        },
                        0,
                    ],
                },
            },
        };

        // Stage 9: Project the final fields to return
        const projectUmrahBookingStage = {
            $project: {
                _id: 1,
                customer: {
                    $ifNull: ['$customerDetails.name', ''],
                },
                umrahPackage: {
                    _id: '$umrahPackageDetails._id',
                    title: '$umrahPackageDetails.title',
                    subtitle: '$umrahPackageDetails.subtitle',
                    journeyDate: '$umrahPackageDetails.journeyDate',
                },
                bookingRefId: 1,
                status: 1,
                bookingType: 'Umrah Package',
                createdAt: 1,
                updatedAt: 1,
                totalTravelerCount: 1,
                totalAmount: 1,
            },
        };

        // Aggregate umrah bookings with traveler count and invoice total amount
        const umrahBookingList = await UmrahBooking.aggregate([
            matchUmrahBookingStage,
            sortUmrahBookingStage,
            lookupUmrahPackageStage,
            unwindUmrahPackageStage,
            lookupTravelerCountStage,
            addFieldsTravelerCountStage,
            lookupInvoiceDetailsStage,
            addFieldsAmountStage,
            projectUmrahBookingStage,
        ]);

        console.log(umrahBookingList);

        // return rendered view
        return res.render('dashboard/customers/customer', {
            title: customer.name,
            customer: prepareRoleDefination(customer),
            countries: Object.values(countries),
            paymentRequests,
            invoices,
            umrahBookingList,
        });
    } catch (error) {
        console.error('Error viewing customer:', error); // Log the error for debugging
        return res.redirect('/dashboard/error/500');
    }
};
