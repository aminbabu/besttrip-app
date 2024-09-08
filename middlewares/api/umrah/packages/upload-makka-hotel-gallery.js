/**
 * @file /middlewares/api/umrah/packages/upload-package-makka-hotel-gallery.js
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

// export umrah package makka hotel gallery upload middleware
module.exports =
    (dir = '/umrah/package') =>
    async (req, res, next) => {
        let umrahPackage = {};

        // get validated data
        const { id } = req.params || {};
        let { makkahHotelExtraThumbnails } = req.files || {};

        // check if extra thumbnails exists
        if (!makkahHotelExtraThumbnails) {
            return next();
        }

        // Convert makkahHotelExtraThumbnails to an array if it's not already
        if (!Array.isArray(makkahHotelExtraThumbnails)) {
            makkahHotelExtraThumbnails = [makkahHotelExtraThumbnails];
        }

        // check if id exists
        if (id) {
            // get umrah package
            umrahPackage = await UmrahPackage.findById(id);
        }

        // check if umrah package makkah hotel extra thumbnails exists
        if (umrahPackage?.makkahHotelExtraThumbnails?.length > 0) {
            // delete previous extra thumbnails only if they exist
            umrahPackage.makkahHotelExtraThumbnails.forEach((thumbnail) => {
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

        // prepare new file paths
        const updatedExtraThumbnails = makkahHotelExtraThumbnails.map(
            (thumbnail) => {
                console.log(thumbnail);

                const updatedThumbnail = { ...thumbnail };
                const thumbnailPath = path.join(
                    '/uploads/',
                    `${dir}/${uuidv4()}_${updatedThumbnail.name}`
                );
                const uploadLogoPath = path.join(
                    __dirname,
                    '../../../../public',
                    thumbnailPath
                );

                /* 
                ./../../../../public
                */

                // move file to upload path
                updatedThumbnail.mv(uploadLogoPath);

                return thumbnailPath;
            }
        );

        // set updated file paths to request body
        req.body.makkahHotelExtraThumbnails = updatedExtraThumbnails;

        // proceed to next middleware
        return next();
    };
