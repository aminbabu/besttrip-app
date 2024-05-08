/**
 * @file /schemas/zod/settings/content/umrah-offer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 07 May, 2024
 */

// dependencies
const { isMongoId } = require('validator');
const { z } = require('zod');
const { UMRAH_STATUS, UMRAH_INCLUSIONS } = require('../../../../constants');

// export umrah content settings schema
module.exports = z
    .object({
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
            .trim()
            .min(3, {
                message: 'Duration must be at least 3 characters',
            })
            .max(255, {
                message: 'Duration must not be greater than 255 characters',
            }),
        inclusions: z
            .string({
                required_error: 'Inclusions is required',
                invalid_type_error: 'Please provide a valid inclusions',
            })
            .refine(
                (inclusions) =>
                    inclusions.every((inclusion) => UMRAH_INCLUSIONS.includes(inclusion)),
                {
                    message: 'Please provide a valid inclusions',
                }
            ),
        price: z
            .number({
                required_error: 'Price is required',
                invalid_type_error: 'Please provide a valid price',
            })
            .min(0, {
                message: 'Price must be at least 0',
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
                message: 'Please provide a valid status',
            }),
    })
    .strict();
