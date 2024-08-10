/**
 * @file /schemas/zod/umrah/packages/umrah-day-wise-itinerary.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 May, 2024
 * @update_date 14 May, 2024
 */

// dependencies
const { z } = require('zod');
const {
    DEFAULT_IMAGE_TYPES,
    DEFAULT_FILE_SIZE,
    ONE_MEGA_BYTE,
} = require('../../../../constants');

// export umrah day wise itinerary schema
module.exports = z
    .object({
        itineraryDays: z
            .array(
                z.object({
                    title: z
                        .string({
                            required_error: 'Itinerary day title is required',
                            invalid_type_error:
                                'Please provide a valid itinerary day title',
                        })
                        .trim()
                        .max(255, {
                            message:
                                'Itinerary day title must be at most 255 characters',
                        })
                        .optional(),
                    description: z
                        .string({
                            required_error:
                                'Itinerary day description is required',
                            invalid_type_error:
                                'Please provide a valid itinerary day description',
                        })
                        .trim()
                        .max(255, {
                            message:
                                'Itinerary day description must be at most 255 characters',
                        })
                        .optional(),
                }),
                {
                    required_error: 'At least one itinerary day is required',
                    invalid_type_error: 'Please provide a valid itinerary day',
                }
            )
            .optional(),
    })
    .strict();
