/**
 * @file /middlewares/umrah/packages/upload-package-madinah-hotel-thumbnail.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 May, 2024
 * @update_date 17 May, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
const { UmrahPackage } = require('../../../models');

// export umrah package madinah hotel thumbnail upload middleware
module.exports =
    (dir = '/umrah/package') =>
    async (req, res, next) => {
        // get validated data
        const { id } = req.params || {};
        const { madinahHotelThumbnail } = req.files || {};

        // check if id exists
        if (id) {
            // get umrah package
            const umrahPackage = await UmrahPackage.findById(id);

            // check if umrah package madinah hotel thumbnail exists
            if (umrahPackage?.madinahHotelThumbnail) {
                // delete previous madinah hotel thumbnail
                fs.unlinkSync(
                    path.join(__dirname, '../../../public/', umrahPackage.madinahHotelThumbnail)
                );
            }
        }

        // prepare file path
        const madinahHotelThumbnailPath = path.join(
            'uploads/',
            `${dir}/${Date.now()}_${madinahHotelThumbnail.name}`
        );
        const uploadLogoPath = path.join(__dirname, '../../../public/', madinahHotelThumbnailPath);

        // move file to upload path
        await madinahHotelThumbnail.mv(uploadLogoPath);

        // set file path to request body
        req.files.madinahHotelThumbnail.path = madinahHotelThumbnailPath;

        // proceed to next middleware
        return next();
    };
