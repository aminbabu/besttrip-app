/**
 * @file
 * /middlewares/api/validators/umrah/travelers/validation-travelers-covid-certificate.js
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

// export travelers covid certificate file validator middleware
module.exports = async (req, res, next) => {
    // get covid certificate
    const { travelerCovidCertificate } = req.files || {};

    // check if the req method is not post and covid certificate
    if (req.method !== 'POST' && !travelerCovidCertificate) {
        return next();
    }

    // check if covid certificate is not uploaded
    if (!travelerCovidCertificate) {
        return res.status(400).json({
            message: 'Please upload a travelerCovidCertificate',
        });
    }

    // check if covid certificate is an array
    if (Array.isArray(travelerCovidCertificate)) {
        return res.status(400).json({
            message: 'Please upload only one travelerCovidCertificate',
        });
    }

    // check if covid certificate is not an image of type jpg, jpeg, png
    if (
        travelerCovidCertificate &&
        !DEFAULT_IMAGE_TYPES.includes(travelerCovidCertificate.mimetype)
    ) {
        return res.status(400).json({
            message: `Please upload a valid image of type ${DEFAULT_IMAGE_TYPES.join(
                ', '
            )}`,
        });
    }

    // check if covid certificate size is greater than 1 MB
    if (travelerCovidCertificate?.size > MAX_FILE_SIZE) {
        return res.status(400).json({
            message: `Please upload a travelerCovidCertificate of size less than ${(
                MAX_FILE_SIZE / MAX_FILE_SIZE
            ).toFixed(2)} MB`,
        });
    }

    // proceed to next middleware
    return next();
};
