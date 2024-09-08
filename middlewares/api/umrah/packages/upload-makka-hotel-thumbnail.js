/**
 * @file /middlewares/api/umrah/packages/upload-package-makka-hotel-thumbnail.js
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

// export umrah package makka hotel thumbnail upload middleware
module.exports =
    (dir = '/umrah/package') =>
    async (req, res, next) => {
        let umrahPackage = {};

        // get validated data
        const { id } = req.params || {};
        const { makkahHotelThumbnail } = req.files || {};

        // If the request is PATCH and no thumbnail is provided, move to the next middleware
        if (req.method === 'PATCH' && !makkahHotelThumbnail) {
            return next();
        }

        // If an id is provided, retrieve the associated UmrahPackage
        if (id) {
            umrahPackage = await UmrahPackage.findById(id);
        }

        // Check if the UmrahPackage has an existing Makkah hotel thumbnail and delete it if the file exists
        if (umrahPackage?.makkahHotelThumbnail) {
            const previousThumbnailPath = path.join(
                __dirname,
                './../../../../public',
                umrahPackage.makkahHotelThumbnail
            );

            // Only delete the file if it exists
            if (fs.existsSync(previousThumbnailPath)) {
                fs.unlinkSync(previousThumbnailPath);
            }
        }

        // Prepare the file path for the new Makkah hotel thumbnail
        const makkahHotelThumbnailPath = path.join(
            '/uploads/',
            `${dir}/${uuidv4()}_${makkahHotelThumbnail.name}`
        );
        const uploadLogoPath = path.join(
            __dirname,
            './../../../../public',
            makkahHotelThumbnailPath
        );

        // Move the file to the upload directory
        await makkahHotelThumbnail.mv(uploadLogoPath);

        // Set the new file path in the request body
        req.files.makkahHotelThumbnail.path = makkahHotelThumbnailPath;

        // Proceed to the next middleware
        return next();
    };
