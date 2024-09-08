/**
 * @file /middlewares/api/umrah/packages/upload-package-madinah-hotel-gallery.js
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

// export umrah package madinah hotel gallery upload middleware
module.exports =
    (dir = '/umrah/package') =>
    async (req, res, next) => {
        let umrahPackage = {};

        // get validated data
        const { id } = req.params || {};
        let { madinahHotelExtraThumbnails } = req.files || {};

        // check if extra thumbnails exists
        if (!madinahHotelExtraThumbnails) {
            return next();
        }

        // Convert madinahHotelExtraThumbnails to an array if it's not already
        if (!Array.isArray(madinahHotelExtraThumbnails)) {
            madinahHotelExtraThumbnails = [madinahHotelExtraThumbnails];
        }

        // check if id exists
        if (id) {
            // get umrah package
            umrahPackage = await UmrahPackage.findById(id);
        }

        // check if umrah package madinah hotel extra thumbnails exist
        if (umrahPackage?.madinahHotelExtraThumbnails?.length > 0) {
            // delete previous extra thumbnails
            umrahPackage.madinahHotelExtraThumbnails.forEach((thumbnail) => {
                if (thumbnail) {
                    const previousThumbnailPath = path.join(
                        __dirname,
                        '../../../../public',
                        thumbnail
                    );

                    // Only delete the file if it exists
                    if (fs.existsSync(previousThumbnailPath)) {
                        fs.unlinkSync(previousThumbnailPath);
                    }
                }
            });
        }

        // prepare file paths for new thumbnails
        const updateExtraThumbnails = madinahHotelExtraThumbnails.map(
            (thumbnail) => {
                const updatedThumbnail = { ...thumbnail };
                const thumbnailPath = path.join(
                    '/uploads/',
                    `${dir}/${uuidv4()}_${updatedThumbnail.name}`
                );
                const uploadPath = path.join(
                    __dirname,
                    '../../../../public',
                    thumbnailPath
                );

                // move file to upload path
                updatedThumbnail.mv(uploadPath);

                return thumbnailPath;
            }
        );

        // set updated file paths to request body
        req.body.madinahHotelExtraThumbnails = updateExtraThumbnails;

        // proceed to next middleware
        return next();
    };
