/**
 * @file
 * /middlewares/api/validators/umrah/travelers/validation-travelers-passport.js
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

// export travelers passport file validator middleware
module.exports = async (req, res, next) => {
    // get passport
    const { passport } = req.files || {};

    // check if the req method is not post and passport
    if (req.method !== 'POST' && !passport) {
        return next();
    }

    // check if passport is not uploaded
    if (!passport) {
        return res.status(200).json({
            message: 'Please upload a passport',
        });
    }

    // check if passport is an array
    if (Array.isArray(passport)) {
        return res.status(200).json({
            message: 'Please upload only one passport',
        });
    }

    // check if passport is not an image of type jpg, jpeg, png
    if (passport && !DEFAULT_IMAGE_TYPES.includes(passport.mimetype)) {
        return res.status(200).json({
            message: `Please upload a valid image of type ${DEFAULT_IMAGE_TYPES.join(
                ', '
            )}`,
        });
    }

    // check if passport size is greater than 1 MB
    if (passport?.size > MAX_FILE_SIZE) {
        return res.status(200).json({
            message: `Please upload a passport of size less than ${(
                MAX_FILE_SIZE / MAX_FILE_SIZE
            ).toFixed(2)} MB`,
        });
    }

    // proceed to next middleware
    return next();
};
