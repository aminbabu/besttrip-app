/**
 * @file /schemas/zo/settings/content/blog-post.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 08 May, 2024
 * @update_date 08 May, 2024
 */

// dependencies
const { isMongoId } = require('validator');
const { z } = require('zod');
const {
    BLOG_STATUS,
    BLOG_DOMESTIC_AIRLINES,
} = require('../../../../constants');

// export blog post schema
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
            }),
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
        subtitle: z
            .string({
                required_error: 'Subtitle is required',
                invalid_type_error: 'Please provide a valid subtitle',
            })
            .trim()
            .min(3, {
                message: 'Subtitle must be at least 3 characters',
            })
            .max(255, {
                message: 'Subtitle must not be greater than 255 characters',
            }),
        rating: z
            .string({
                required_error: 'Rating is required',
                invalid_type_error: 'Please provide a valid rating',
            })
            .refine((ratting) => ratting >= 0 && ratting <= 5, {
                message: 'Please provide a valid rating',
            }),
        numberOfReviews: z
            .string({
                required_error: 'Number of reviews is required',
                invalid_type_error: 'Please provide a valid number of reviews',
            })
            .refine((reviews) => reviews > 0, {
                message:
                    'Please provide a valid number of reviews greater than 0',
            }),
        description: z
            .string({
                required_error: 'Description is required',
                invalid_type_error: 'Please provide a valid description',
            })
            .trim()
            .min(3, {
                message: 'Description must be at least 3 characters',
            })
            .max(1000, {
                message: 'Description must not be greater than 1000 characters',
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
        status: z
            .string({
                required_error: 'Status is required',
                invalid_type_error: 'Please provide a valid status',
            })
            .refine((status) => BLOG_STATUS.includes(status), {
                message: `Please provide a valid status. Available options are ${BLOG_STATUS.join(
                    ', '
                )}`,
            }),
        nearestAirport: z
            .string({
                required_error: 'Nearest Airport is required',
                invalid_type_error: 'Please provide a valid nearest Airport',
            })
            .trim()
            .min(3, {
                message: 'Nearest Airport must be at least 3 characters',
            })
            .max(255, {
                message:
                    'Nearest Airport must not be greater than 255 characters',
            }),
        domesticAirlines: z
            .union([
                z
                    .string({
                        required_error: 'Domestic Airlines is required',
                        invalid_type_error:
                            'Please provide a valid domestic Airlines',
                    })
                    .transform((domesticAirlines) =>
                        domesticAirlines.split(',')
                    ),
                z.array(
                    z.string({
                        required_error: 'Domestic Airlines is required',
                        invalid_type_error:
                            'Please provide a valid domestic Airlines',
                    })
                ),
            ])
            .transform((domesticAirlines) =>
                Array.isArray(domesticAirlines)
                    ? domesticAirlines
                    : [domesticAirlines]
            )
            .refine(
                (domesticAirlines) =>
                    domesticAirlines.every((airline) =>
                        BLOG_DOMESTIC_AIRLINES.includes(airline)
                    ),
                {
                    message: `Please provide a valid domestic Airlines. Available options are ${BLOG_DOMESTIC_AIRLINES.join(
                        ', '
                    )}`,
                }
            ),
    })
    .strict();
