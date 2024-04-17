/**
 * @file /schemas/zod/settings/site/meta-data.js
 * @project best-trip
 * @version 1.0.0
 * @author best-trip
 * @date 17 April, 2024
 * @update_date 17 April, 2024
 */

// dependencies
const { z } = require('zod');

// export meta data schema
module.exports = z
    .object(
        z
            .array(
                z.object({
                    name: z
                        .string({
                            required_error: 'Meta name is required',
                            invalid_type_error: 'Meta name must be a string',
                        })
                        .trim()
                        .min(3, {
                            message: 'Meta name must be at least 3 characters',
                        }),
                    content: z
                        .string({
                            required_error: 'Meta content is required',
                            invalid_type_error: 'Meta content must be a string',
                        })
                        .trim()
                        .min(3, {
                            message: 'Meta content must be at least 3 characters',
                        }),
                }),
                {
                    required_error: 'Meta data is required',
                    invalid_type_error: 'Meta data must be an array',
                }
            )
            .nonempty({
                message: 'Meta data is required',
            }),
        {
            required_error: 'Meta data is required',
            invalid_type_error: 'Meta data must be an object',
        }
    )
    .strict();
