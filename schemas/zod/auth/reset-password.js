/**
 * @file /schemas/zod/auth/reset-password.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const { isJWT } = require('validator');
const { z } = require('zod');

// export reset password schema
module.exports = z
    .object({
        token: z
            .string({
                required_error: 'Token is required.',
                invalid_type_error: 'Please enter a valid token.',
            })
            .refine((value) => isJWT(value), {
                message: 'Please enter a valid token.',
            }),
        password: z
            .string({
                required_error: 'Password is required.',
                invalid_type_error: 'Password must be a string.',
            })
            .min(8, 'Password must be at least 8 characters long.'),
        confirmPassword: z
            .string({
                required_error: 'Confirm password is required.',
                invalid_type_error: 'Confirm password must be a string.',
            })
            .min(8, 'Confirm password must be at least 8 characters long.')
            .refine((value, data) => {
                if (value !== data.password) {
                    throw new Error('Passwords do not match.');
                }
                return true;
            }),
    })
    .strict();
