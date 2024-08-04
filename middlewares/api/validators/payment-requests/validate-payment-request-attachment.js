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
    // get payment request attachment
    const { attachment } = req.files || {};

    // check if attachment exists
    if (!attachment) {
        return res.status(200).json({
            message: 'Please upload a valid attachment',
        });
    }

    // check if attachment is an array
    if (Array.isArray(attachment)) {
        return res.status(200).json({
            message: 'Please upload a single attachment',
        });
    }

    // check if attachment is not an image of type jpg, jpeg, png
    if (attachment && !DEFAULT_IMAGE_TYPES.includes(attachment.mimetype)) {
        return res.status(200).json({
            message: `Please upload a valid attachment of type ${DEFAULT_IMAGE_TYPES.join(
                ', '
            )}`,
        });
    }

    // check if attachment size is greater than 1 MB
    if (attachment?.size > ONE_MEGA_BYTE) {
        return res.status(200).json({
            message: `Please upload a attachment of size less than ${(
                ONE_MEGA_BYTE / ONE_MEGA_BYTE
            ).toFixed(2)} MB`,
        });
    }

    // proceed to next middleware
    return next();
};
