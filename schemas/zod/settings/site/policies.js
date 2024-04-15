/**
 * @file /schemas/zod/settings/site/policies.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 April, 2024
 * @update_date 15 April, 2024
 */

// dependencies
const { z } = require('zod');

// export site policies settings schema
module.exports = z.array(
    z.object({
        key: z
            .string({
                required_error: `${this.key} is required`,
                invalid_type_error: `${this.key} should be a string`,
            })
            .min(3, {
                message: `${this.key} should have at least 3 characters`,
            })
            .optional(),
        content: z
            .string({
                required_error: `${this.content} is required`,
                invalid_type_error: `${this.content} should be a string`,
            })
            .min(3, {
                message: `${this.content} should have at least 3 characters`,
            })
            .optional(),
    })
);
