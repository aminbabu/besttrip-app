/**
 * @file /schemas/zod/umrah/package-types/umrah-package-type.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 28 April, 2024
 * @update_date 10 May, 2024
 */

// dependencies
const { z } = require('zod');
const { isMongoId } = require('validator');
const {
    UMRAH_PACKAGE_TYPES,
    UMRAH_PACKAGE_TYPE_STATUS,
} = require('../../../../constants');

// export umrah package type schema
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
        name: z
            .string({
                required_error: 'Name is required',
                invalid_type_error: 'Please provide a valid name',
            })
            .refine(
                (name) => UMRAH_PACKAGE_TYPES.includes(name.toLowerCase()),
                {
                    message: `Please provide a valid name. Valid names are: ${UMRAH_PACKAGE_TYPES.join(
                        ', '
                    )}`,
                }
            ),
        status: z
            .string({
                required_error: 'Status is required',
                invalid_type_error: 'Please provide a valid status',
            })
            .refine((status) => UMRAH_PACKAGE_TYPE_STATUS.includes(status), {
                message: `Please provide a valid status. Valid statuses are: ${UMRAH_PACKAGE_TYPE_STATUS.join(
                    ', '
                )}`,
            }),
    })
    .strict();
