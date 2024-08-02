/**
 * @file
 * /middlewares/api/validators/umrah/travelers/validation-travelers-photo.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 08 May, 2024
 */

// dependencies
const {
    DEFAULT_IMAGE_TYPES,
    MAX_FILE_SIZE,
} = require('../../../../../constants');

// export travelers photo file validator middleware
module.exports = async (req, res, next) => {
    // get travelerPhoto
    const { travelerPhoto } = req.files || {};

    // check if the req method is not post and travelerPhoto
    if (req.method !== 'POST' && !travelerPhoto) {
        return next();
    }

    // check if travelerPhoto is not uploaded
    if (!travelerPhoto) {
        return res.status(200).json({
            message: 'Please upload a travelerPhoto',
        });
    }

    // check if travelerPhoto is an array
    if (Array.isArray(travelerPhoto)) {
        return res.status(200).json({
            message: 'Please upload only one travelerPhoto',
        });
    }

    // check if travelerPhoto is not an image of type jpg, jpeg, png
    if (
        travelerPhoto &&
        !DEFAULT_IMAGE_TYPES.includes(travelerPhoto.mimetype)
    ) {
        return res.status(200).json({
            message: `Please upload a valid image of type ${DEFAULT_IMAGE_TYPES.join(
                ', '
            )}`,
        });
    }

    // check if travelerPhoto size is greater than 1 MB
    if (travelerPhoto?.size > MAX_FILE_SIZE) {
        return res.status(200).json({
            message: `Please upload a travelerPhoto of size less than ${(
                MAX_FILE_SIZE / MAX_FILE_SIZE
            ).toFixed(2)} MB`,
        });
    }

    // proceed to next middleware
    return next();
};
