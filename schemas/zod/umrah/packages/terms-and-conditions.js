/**
 * @file /schemas/zod/umrah/packages/umrah-terms-and-conditions.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 May, 2024
 * @update_date 14 May, 2024
 */

// dependencies
const { z } = require('zod');

// export umrah terms and conditions schema
module.exports = z
    .object({
        termsConditions: z
            .string({
                required_error: 'Terms conditions is required',
                invalid_type_error: 'Please provide a valid terms conditions',
            })
            .trim()
            .min(1, {
                message: 'Terms conditions must be at least 1 characters',
            }),
    })
    .strict();
