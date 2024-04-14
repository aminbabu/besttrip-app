/**
 * @file /schemas/zod/users/user.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const { z } = require('zod');
const { isMobilePhone, isPostalCode, isMongoId } = require('validator');
const { USER_STATUS, USER_ROLES } = require('../../../constants');

// export user schema
module.exports = z
    .object({
        id: z
            .string({
                required_error: 'Id is required.',
            })
            .refine((id) => isMongoId(id), {
                message: 'Please enter a valid id.',
            }),
        name: z
            .string({
                required_error: 'Name is required.',
                invalid_type_error: 'Please enter a valid name.',
            })
            .trim()
            .min(3, {
                message: 'Name must be at least 3 characters long.',
            }),
        email: z
            .string({
                required_error: 'Email is required.',
                invalid_type_error: 'Please enter a valid email address.',
            })
            .email({
                message: 'Please enter a valid email address.',
            }),
        phone: z
            .string({
                required_error: 'Phone number is required.',
            })
            .refine((phone) => isMobilePhone(phone), {
                message: 'Please enter a valid phone number.',
            }),
        password: z
            .string()
            .min(8, {
                message: 'Password must be at least 8 characters long.',
            })
            .optional(),
        dob: z
            .date({
                invalid_type_error: 'Please enter a valid date of birth.',
            })
            .optional(),
        status: z
            .enum(USER_STATUS, {
                invalid_type_error: 'Please enter a valid status.',
            })
            .optional(),
        address: z
            .string()
            .trim()
            .min(3, {
                message: 'Address must be at least 3 characters long.',
            })
            .max(100, {
                message: 'Address must not be more than 100 characters long.',
            })
            .optional(),
        city: z
            .string()
            .trim()
            .min(3, {
                message: 'City must be at least 3 characters long.',
            })
            .max(50, {
                message: 'City must not be more than 50 characters',
            })
            .optional(),
        state: z
            .string()
            .trim()
            .min(3, {
                message: 'State must be at least 3 characters long.',
            })
            .max(50, {
                message: 'State must not be more than 50 characters',
            })
            .optional(),
        country: z
            .string()
            .trim()
            .min(3, {
                message: 'Country must be at least 3 characters long.',
            })
            .max(50, {
                message: 'Country must not be more than 50 characters',
            })
            .optional(),
        postalCode: z
            .string()
            .refine((postalCode) => isPostalCode(postalCode), {
                message: 'Please enter a valid postal code.',
            })
            .optional(),
        role: z
            .enum(USER_ROLES, {
                invalid_type_error: 'Please enter a valid role.',
            })
            .optional(),
        isVerified: z
            .boolean({
                invalid_type_error: 'Please enter a valid verification status.',
            })
            .optional(),
    })
    .strict();
