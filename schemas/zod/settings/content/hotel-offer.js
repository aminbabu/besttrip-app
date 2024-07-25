/**
 * @file /schemas/zod/settings/content/hotel-offer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 07 May, 2024
 */

// dependencies
const { isMongoId } = require('validator');
const { z } = require('zod');
const { HOTEL_STATUS } = require('../../../../constants');

// export hotel content settings schema
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
        rating: z
            .string({
                required_error: 'Rating is required',
                invalid_type_error: 'Please provide a valid rating',
            })
            .refine((rating) => Number(rating) >= 0 && Number(rating) <= 5, {
                message: 'Please provide a valid rating',
            }),
        price: z
            .string({
                required_error: 'Price is required',
                invalid_type_error: 'Please provide a valid price',
            })
            .refine((price) => Number(price) >= 0, {
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
            .refine((status) => HOTEL_STATUS.includes(status), {
                message: 'Please provide a valid status',
            }),
    })
    .strict();
