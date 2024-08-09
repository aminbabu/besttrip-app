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

        // get customer by id with wallet, bookings, and payment-requests in descending order
        const existingCustomer = await Customer.findById(id).populate({
            path: 'wallet',
        });

        // check if customer exists
        if (!existingCustomer) {
            return res.redirect('/dashboard/error/404');
        }

        const customer = existingCustomer.toObject();

        // format customer dates
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

        // Aggregate invoices with umrah bookings
        const invoices = await Invoice.aggregate([
            { $match: { customer: new mongoose.Types.ObjectId(id) } },
            { $sort: { createdAt: -1 } },
            {
                $lookup: {
                    from: 'umrahbookings',
                    localField: 'bookingId',
                    foreignField: '_id',
                    as: 'bookingDetails',
                },
            },
            {
                $unwind: {
                    path: '$bookingDetails',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'customers',
                    localField: 'customer',
                    foreignField: '_id',
                    as: 'customerDetails',
                },
            },
            {
                $unwind: {
                    path: '$customerDetails',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
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
                    partialPaymentRestAmount: 1,
                    customer: {
                        $ifNull: ['$customerDetails.name', ''],
                    },
                    createdAt: 1,
                    updatedAt: 1,
                },
            },
        ]);

        // Aggregate umrahBookingList with umrah bookings
        const umrahBookingList = await UmrahBooking.aggregate([
            { $match: { customer: new mongoose.Types.ObjectId(id) } },
            { $sort: { createdAt: -1 } },
            {
                $lookup: {
                    from: 'customers',
                    localField: 'customer',
                    foreignField: '_id',
                    as: 'customerDetails',
                },
            },
            {
                $unwind: {
                    path: '$customerDetails',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'umrahpackages',
                    localField: 'umrahPackage',
                    foreignField: '_id',
                    as: 'umrahPackageDetails',
                },
            },
            {
                $unwind: {
                    path: '$umrahPackageDetails',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
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
                },
            },
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
