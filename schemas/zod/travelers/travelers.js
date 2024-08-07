/**
 * @file /schemas/zod/travelers/traveler.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 31 July, 2024
 * @update_date 31 July, 2024
 */

// dependencies
const { z } = require('zod');
const moment = require('moment');
const { isMongoId } = require('validator');
const {
    TRAVELERS_TYPES,
    TRAVELERS_GENDERS,
} = require('../../../constants/traveler');

// export traveler schema
module.exports = z
    .object({
        ids: z
            .array(
                z.string({
                    required_error: 'IDs are required',
                    invalid_type_error: 'Please provide valid IDs',
                })
            )
            .nonempty({
                message: 'IDs array must not be empty',
            }),
        id: z
            .string({
                required_error: 'Id is required',
                invalid_type_error: 'Please provide a valid id',
            })
            .refine((id) => isMongoId(id), {
                message: 'Please provide a valid id',
            }),
        travelerType: z
            .enum(TRAVELERS_TYPES, {
                required_error: 'Traveler Type is required',
                invalid_type_error: 'Invalid Traveler Type',
            })
            .default(TRAVELERS_TYPES[0])
            .refine((travelerType) => TRAVELERS_TYPES.includes(travelerType), {
                message: 'Please provide a valid travelerType',
            }),
        firstName: z
            .string({
                required_error: 'First name is required',
            })
            .nonempty('First name is required'),
        lastName: z
            .string({
                required_error: 'Last name is required',
            })
            .nonempty('Last name is required'),
        gender: z
            .enum(TRAVELERS_GENDERS, {
                required_error: 'Gender is required',
                invalid_type_error: 'Invalid Gender',
            })
            .default(TRAVELERS_GENDERS[0])
            .refine((gander) => TRAVELERS_GENDERS.includes(gander), {
                message: 'Please provide a valid travelerType',
            }),
        dateOfBirth: z
            .string({
                required_error: 'Date Of Birth is required',
                invalid_type_error: 'Invalid Date Of Birth',
            })
            .refine(
                (expiryDate) =>
                    moment(expiryDate, 'YYYY-MM-DD', true).isValid(),
                {
                    message: 'Please provide a valid Date Of Birth',
                }
            ),
        country: z
            .string({
                required_error: 'Country is required',
            })
            .nonempty('Country is required'),
        cityName: z
            .string({
                required_error: 'City is required',
            })
            .nonempty('City is required'),
        passportNumber: z
            .string({
                required_error: 'Passport Number is required',
            })
            .nonempty('Passport Number is required'),
        documentIssueCountry: z
            .string({
                required_error: 'Document Issue Country is required',
            })
            .nonempty('Document Issue Country is required'),
        passportExpiryDate: z
            .string({
                required_error: 'Passport Expiry Date is required',
                invalid_type_error: 'Invalid Passport Expiry Date',
            })
            .refine(
                (expiryDate) =>
                    moment(expiryDate, 'YYYY-MM-DD', true).isValid(),
                {
                    message: 'Please provide a valid Passport Expiry Date',
                }
            ),
        presentAddress: z
            .string({
                required_error: 'Present Address is required',
            })
            .nonempty('Present Address is required'),
        permanentAddress: z
            .string({
                required_error: 'Permanent Address is required',
            })
            .nonempty('Permanent Address is required'),
        emergencyContactNo: z
            .string({
                required_error: 'Emergency Contact No is required',
            })
            .nonempty('Emergency Contact No is required'),
        email: z
            .string({
                invalid_type_error: 'Invalid Email',
            })
            .optional()
            .refine((value) => {
                // Email is only required for adults
                return value || this.travelerType !== 'adult';
            }, 'Email is required for adult travelers'),
        phone: z
            .string({
                required_error: 'Phone Number No is required',
            })
            .nonempty('Phone Number No is required'),
        umrahPackage: z
            .string({
                required_error: 'Umrah Package ID is required',
            })
            .refine((id) => isMongoId(id), {
                message: 'Umrah Package ID must be a valid MongoDB ObjectID',
            }),
        umrahBooking: z
            .string({
                required_error: 'Umrah Booking ID is required',
            })
            .refine((id) => isMongoId(id), {
                message: 'UmrahBooking ID must be a valid MongoDB ObjectID',
            }),
        customerId: z
            .string({
                required_error: 'Customer ID is required',
            })
            .refine((id) => isMongoId(id), {
                message: 'Customer ID must be a valid MongoDB ObjectID',
            }),
    })
    .strict();
