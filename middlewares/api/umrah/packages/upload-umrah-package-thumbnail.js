/**
 * @file /middlewares/api/umrah/packages/upload-package-thumbnail.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 May, 2024
 * @update_date 03 Jul, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { UmrahPackage } = require('../../../../models');

// export umrah package thumbnail upload middleware
module.exports =
    (dir = '/umrah/package') =>
    async (req, res, next) => {
        let umrahPackage = {};

        // get validated data
        const { id } = req.params || {};
        const { thumbnail } = req.files || {};

        // If request method is PATCH and no new thumbnail is provided, skip the update
        if (req.method === 'PATCH' && !thumbnail) {
            return next();
        }

        // If id exists, retrieve the corresponding UmrahPackage
        if (id) {
            umrahPackage = await UmrahPackage.findById(id);
        }

        // Check if the umrahPackage has a previous thumbnail and if the file exists
        if (umrahPackage?.thumbnail) {
            const previousThumbnailPath = path.join(
                __dirname,
                './../../../../public',
                umrahPackage.thumbnail
            );

            // If the file exists, delete the previous thumbnail
            if (fs.existsSync(previousThumbnailPath)) {
                fs.unlinkSync(previousThumbnailPath);
            }
        }

        // Prepare new thumbnail file path
        const thumbnailPath = path.join(
            '/uploads/',
            `${dir}/${uuidv4()}_${thumbnail.name}`
        );
        const uploadLogoPath = path.join(
            __dirname,
            './../../../../public',
            thumbnailPath
        );

        // Move the uploaded thumbnail to the defined path
        await thumbnail.mv(uploadLogoPath);

        // Set the new thumbnail path in the request body
        req.files.thumbnail.path = thumbnailPath;

        // Proceed to the next middleware
        return next();
    };
