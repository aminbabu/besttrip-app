/**
 * @file /middlewares/api/umrah/packages/upload-package-gallery.js
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

// export umrah package gallery upload middleware
module.exports =
    (dir = '/umrah/package') =>
    async (req, res, next) => {
        let umrahPackage = {};

        // get validated data
        const { id } = req.params || {};
        let { extraThumbnails } = req.files || {};

        // Check if extra thumbnails exist, if not, move to the next middleware
        if (!extraThumbnails) {
            return next();
        }

        // Convert extraThumbnails to an array if it's not already an array
        if (!Array.isArray(extraThumbnails)) {
            extraThumbnails = [extraThumbnails];
        }

        // If an id is provided, retrieve the associated UmrahPackage
        if (id) {
            umrahPackage = await UmrahPackage.findById(id);
        }

        // Check if the UmrahPackage has existing extra thumbnails and delete them
        if (umrahPackage?.extraThumbnails?.length > 0) {
            umrahPackage.extraThumbnails.forEach((thumbnail) => {
                const previousThumbnailPath = path.join(
                    __dirname,
                    './../../../../public',
                    thumbnail
                );

                // Only delete the file if it exists
                if (fs.existsSync(previousThumbnailPath)) {
                    fs.unlinkSync(previousThumbnailPath);
                }
            });
        }

        // Prepare file paths for the new extraThumbnails
        const updateExtraThumbnails = extraThumbnails.map((thumbnail) => {
            const thumbnailPath = path.join(
                '/uploads/',
                `${dir}/${uuidv4()}_${thumbnail.name}`
            );
            const uploadLogoPath = path.join(
                __dirname,
                './../../../../public',
                thumbnailPath
            );

            // Move the file to the upload directory
            thumbnail.mv(uploadLogoPath);

            // Return the updated path for the thumbnail
            return thumbnailPath;
        });

        // Set the updated extraThumbnails paths in the request body
        req.body.extraThumbnails = updateExtraThumbnails;

        // Proceed to the next middleware
        return next();
    };
