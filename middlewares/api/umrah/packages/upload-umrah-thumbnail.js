/**
 * @file /middlewares/api/umrah/packages/upload-package-umrah-package-thumbnail.js
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
        const { umrahThumbnail } = req.files || {};

        // If the method is PATCH and no new thumbnail is provided, proceed to the next middleware
        if (req.method === 'PATCH' && !umrahThumbnail) {
            return next();
        }

        // check if id exists
        if (id) {
            // get umrah package by id
            umrahPackage = await UmrahPackage.findById(id);
        }

        // check if the umrah package already has a thumbnail
        if (umrahPackage?.umrahThumbnail) {
            const previousThumbnailPath = path.join(
                __dirname,
                '../../../../public',
                umrahPackage.umrahThumbnail
            );

            // Delete previous thumbnail if it exists
            if (fs.existsSync(previousThumbnailPath)) {
                fs.unlinkSync(previousThumbnailPath);
            }
        }

        // Proceed only if there is a new umrahThumbnail to upload
        if (umrahThumbnail) {
            // Prepare file path for the new thumbnail
            const thumbnailFileName = `${uuidv4()}_${umrahThumbnail.name}`;
            const thumbnailPath = path.join(
                '/uploads/',
                dir,
                thumbnailFileName
            );
            const uploadFilePath = path.join(
                __dirname,
                '../../../../public',
                thumbnailPath
            );

            // Move the file to the designated upload path
            try {
                await umrahThumbnail.mv(uploadFilePath);
            } catch (error) {
                return res
                    .status(500)
                    .json({ message: 'File upload failed', error });
            }

            // Set the file path to request body for later use
            req.files.umrahThumbnail.path = thumbnailPath;
        }

        // Proceed to the next middleware
        return next();
    };
