/**
 * @file /schemas/zod/login.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const { z } = require('zod');

// export login schema
module.exports = z
    .object({
        email: z.string().email({
            message: 'Please enter a valid email address.',
        }),
        password: z.string().min(8, {
            message: 'Password must be at least 8 characters long.',
        }),
    })
    .strict();
