/**
 * @file /schemas/zod/auth/register.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const { isMobilePhone } = require('validator');
const { z } = require('zod');

// export register schema
module.exports = z
    .object({
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
        password: z.string().min(8, {
            message: 'Password must be at least 8 characters long',
        }),
    })
    .strict();
