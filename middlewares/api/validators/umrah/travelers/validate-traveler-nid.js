/**
 * @file
 * /middlewares/api/validators/umrah/travelers/validation-travelers-nid.js
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

// export travelers NID file validator middleware
module.exports = async (req, res, next) => {
    // get travelerNID
    const { travelerNID } = req.files || {};

    // check if the req method is not POST and travelerNID is not provided
    if (req.method !== 'POST' && !travelerNID) {
        return next();
    }

    // check if travelerNID is not uploaded
    if (!travelerNID) {
        return res.status(400).json({
            message: 'Please upload a travelerNID',
        });
    }

    // check if travelerNID is an array
    if (Array.isArray(travelerNID)) {
        return res.status(400).json({
            message: 'Please upload only one travelerNID',
        });
    }

    // check if travelerNID is not an image of type jpg, jpeg, png
    if (travelerNID && !DEFAULT_IMAGE_TYPES.includes(travelerNID.mimetype)) {
        return res.status(400).json({
            message: `Please upload a valid image of type ${DEFAULT_IMAGE_TYPES.join(
                ', '
            )}`,
        });
    }

    // check if travelerNID size is greater than Max File Size
    if (travelerNID?.size > MAX_FILE_SIZE) {
        return res.status(400).json({
            message: `Please upload a travelerNID of size less than ${(
                MAX_FILE_SIZE /
                (1024 * 1024)
            ).toFixed(2)} MB`,
        });
    }

    // proceed to next middleware
    return next();
};
