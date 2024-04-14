/**
 * @file /schemas/zod/auth/verify-email.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const { isJWT } = require('validator');
const { z } = require('zod');

// export verify email schema
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
    })
    .strict();
