/**
 * @file
 * /middlewares/api/validators/payment-requests/validate-payment-request-attachment.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 16 June, 2024
 * @update_date 16 June, 2024
 */

// dependencies
const { DEFAULT_IMAGE_TYPES, ONE_MEGA_BYTE } = require('../../../../constants');

// export payment request attachment validator
module.exports = async (req, res, next) => {
    try {
        // get payment request attachment
        const { attachment } = req.files || {};

        // check if attachment exists
        if (!attachment) {
            return res.status(400).json({
                message:
                    'No attachment uploaded. Please upload a valid attachment.',
            });
        }

        // check if attachment is an array
        if (Array.isArray(attachment)) {
            return res.status(400).json({
                message: 'Please upload only one attachment.',
            });
        }

        // check if attachment is an image of the allowed types
        if (!DEFAULT_IMAGE_TYPES.includes(attachment.mimetype)) {
            return res.status(400).json({
                message: `Invalid file type. Please upload an attachment of type ${DEFAULT_IMAGE_TYPES.join(
                    ', '
                )}.`,
            });
        }

        // check if attachment size is within the allowed limit (e.g., 1 MB)
        if (attachment.size > ONE_MEGA_BYTE) {
            return res.status(400).json({
                message: `File size exceeds the limit. Please upload an attachment smaller than ${(
                    ONE_MEGA_BYTE / ONE_MEGA_BYTE
                ).toFixed(2)} MB.`,
            });
        }

        // proceed to next middleware
        next();
    } catch (error) {
        console.error(
            'Error validating payment request attachment:',
            error.message
        );
        res.status(500).json({
            message: 'Internal server error. Please try again later.',
        });
    }
};
