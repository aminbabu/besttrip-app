/**
 * @file /utils/validate-image.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 05 April, 2024
 * @update_date 05 April, 2024
 */

// export validate image function
module.exports =
    (allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'], maxSizeInBytes = 1024 * 1024) =>
    (value, { req }) => {
        // get the field name
        const fieldName = this.path;

        // check if the image is uploaded
        if (!req.files || !req.files[fieldName]) {
            throw new Error(`No ${fieldName} uploaded`);
        }

        // get the uploaded file
        const file = req.files[fieldName];
        // get allowed file types extensions
        const allowedExtensions = allowedTypes.map((type) => type.split('/')[1]);
        // maximum file size
        const maxSizeInMegaBytes = maxSizeInBytes / (1024 * 1024);

        // check file type
        if (!allowedTypes.includes(file.mimetype)) {
            throw new Error(`File type must be ${allowedExtensions.join(', ')}`);
        }

        // check file size
        if (file.size > maxSizeInBytes) {
            throw new Error(`File size exceeds the limit of ${maxSizeInMegaBytes}MB`);
        }

        // validation passed
        return true;
    };
