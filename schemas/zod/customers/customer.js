/**
 * @file /schemas/zod/customers/customer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 09 June, 2024
 */

// dependencies
const { z } = require('zod');
const { isMobilePhone, isMongoId } = require('validator');
const moment = require('moment');
const {
    CUSTOMER_STATUS,
    CUSTOMER_WALLET_TRANSACTION_TYPES,
    CUSTOMER_ROLES,
    POST_CODE_REGEX,
} = require('../../../constants');

// export customer schema
module.exports = z
    .object({
        id: z
            .string({
                required_error: 'Id is required',
                invalid_type_error: 'Please provide a valid id',
            })
            .refine((id) => isMongoId(id), {
                message: 'Please provide a valid id',
            }),
        name: z
            .string({
                required_error: 'Name is required',
                invalid_type_error: 'Please enter a valid name',
            })
            .trim()
            .min(3, {
                message: 'Name must be at least 3 characters long',
            }),
        email: z
            .string({
                required_error: 'Email is required',
                invalid_type_error: 'Please enter a valid email address',
            })
            .email({
                message: 'Please enter a valid email address',
            }),
        phone: z
            .string({
                required_error: 'Phone number is required',
            })
            .refine((phone) => isMobilePhone(phone), {
                message: 'Please enter a valid phone number',
            }),
        password: z
            .string()
            .min(8, {
                message: 'Password must be at least 8 characters long',
            })
            .optional(),
        dob: z
            .string({
                required_error: 'Date of birth is required',
                invalid_type_error: 'Please enter a valid date of birth',
            })
            .refine((dob) => moment(dob, 'YYYY-MM-DD', true).isValid(), {
                message: 'Please enter a valid date of birth',
            })
            .optional(),
        status: z
            .string({
                required_error: 'Status is required',
                invalid_type_error: 'Please enter a valid status',
            })
            .refine((status) => CUSTOMER_STATUS.includes(status), {
                message: 'Please enter a valid status',
            })
            .optional(),
        address: z
            .string()
            .trim()
            .min(3, {
                message: 'Address must be at least 3 characters long',
            })
            .max(100, {
                message: 'Address must not be more than 100 characters',
            })
            .optional(),
        city: z
            .string()
            .trim()
            .min(3, {
                message: 'City must be at least 3 characters long',
            })
            .max(50, {
                message: 'City must not be more than 50 characters',
            })
            .optional(),
        state: z
            .string()
            .trim()
            .min(3, {
                message: 'State must be at least 3 characters long',
            })
            .max(50, {
                message: 'State must not be more than 50 characters',
            })
            .optional(),
        country: z
            .string()
            .trim()
            .min(3, {
                message: 'Country must be at least 3 characters long',
            })
            .max(50, {
                message: 'Country must not be more than 50 characters',
            })
            .optional(),
        postalCode: z
            .string()
            .refine((postalCode) => POST_CODE_REGEX.test(postalCode), {
                message: 'Please enter a valid postal code',
            })
            .optional(),
        flyerNumber: z
            .string({
                required_error: 'Flyer number is required',
                invalid_type_error: 'Please enter a valid flyer number',
            })
            .min(3, {
                message: 'Flyer number must be at least 3 characters long',
            })
            .max(50, {
                message: 'Flyer number must not be more than 50 characters',
            })
            .optional(),
        wallet: z
            .object(
                {
                    balance: z.number({
                        required_error: 'Wallet balance is required',
                        invalid_type_error: 'Please enter a valid wallet balance',
                    }),
                    type: z
                        .string({
                            required_error: 'Wallet transaction type is required',
                            invalid_type_error: 'Please enter a valid wallet transaction type',
                        })
                        .refine((type) => CUSTOMER_WALLET_TRANSACTION_TYPES.includes(type), {
                            message: 'Please enter a valid wallet transaction type',
                        }),
                    description: z
                        .string({
                            invalid_type_error: 'Please enter a valid wallet description',
                        })
                        .min(3, {
                            message: 'Wallet description must be at least 3 characters long',
                        })
                        .max(100, {
                            message: 'Wallet description must not be more than 100 characters',
                        })
                        .optional(),
                },
                {
                    required_error: 'Wallet is required',
                    invalid_type_error: 'Please enter a valid wallet balance and transaction type',
                }
            )
            .optional(),
        role: z
            .string({
                required_error: 'Role is required',
                invalid_type_error: 'Please enter a valid role',
            })
            .refine((role) => CUSTOMER_ROLES.includes(role), {
                message: 'Please enter a valid role',
            })
            .optional(),
        isVerified: z
            .boolean({
                invalid_type_error: 'Please enter a valid verification status',
            })
            .optional(),
    })
    .strict();
