/**
 * @file /schemas/zod/settings/content/umrah-offer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 08 May, 2024
 */

// dependencies
const { isMongoId } = require('validator');
const { z } = require('zod');
const { UMRAH_STATUS, UMRAH_INCLUSIONS } = require('../../../../constants');

// export umrah content settings schema
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
            })
            .optional(),
        id: z
            .string({
                required_error: 'Id is required',
                invalid_type_error: 'Please provide a valid id',
            })
            .refine((id) => isMongoId(id), {
                message: 'Please provide a valid id',
            }),
        title: z
            .string({
                required_error: 'Title is required',
                invalid_type_error: 'Please provide a valid title',
            })
            .trim()
            .min(3, {
                message: 'Title must be at least 3 characters',
            })
            .max(255, {
                message: 'Title must not be greater than 255 characters',
            }),
        location: z
            .string({
                required_error: 'Location is required',
                invalid_type_error: 'Please provide a valid location',
            })
            .trim()
            .min(3, {
                message: 'Location must be at least 3 characters',
            })
            .max(255, {
                message: 'Location must not be greater than 255 characters',
            }),
        duration: z
            .string({
                required_error: 'Duration is required',
                invalid_type_error: 'Please provide a valid duration',
            })
            .refine((duration) => duration >= 0, {
                message: 'Please provide a valid duration',
            }),
        inclusions: z
            .union([
                z
                    .string({
                        invalid_type_error: 'Please provide valid inclusions',
                    })
                    .transform((inclusion) => inclusion.split(',')),
                z.array(
                    z.string({
                        invalid_type_error: 'Please provide valid inclusions',
                    })
                ),
            ])
            .transform((inclusions) =>
                Array.isArray(inclusions) ? inclusions : [inclusions]
            )
            .refine(
                (inclusions) =>
                    inclusions.every((inclusion) =>
                        UMRAH_INCLUSIONS.includes(inclusion)
                    ),
                {
                    message: `Please provide valid inclusions. Available options are ${UMRAH_INCLUSIONS.join(
                        ', '
                    )}`,
                }
            ),
        price: z
            .string({
                required_error: 'Price is required',
                invalid_type_error: 'Please provide a valid price',
            })
            .refine((price) => price >= 0, {
                message: 'Please provide a valid price',
            }),
        link: z
            .string({
                required_error: 'Link is required',
                invalid_type_error: 'Please provide a valid link',
            })
            .url({
                message: 'Please provide a valid link',
            }),
        status: z
            .string({
                required_error: 'Status is required',
                invalid_type_error: 'Please provide a valid status',
            })
            .refine((status) => UMRAH_STATUS.includes(status), {
                message: `Please provide a valid status. Available options are ${UMRAH_STATUS.join(
                    ', '
                )}`,
            }),
    })
    .strict();
