/**
 * @file /middlewares/umrah/packages/upload-package-madinah-hotel-thumbnail.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 May, 2024
 * @update_date 09 May, 2024
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
        const { madinahhHotelThumbnail } = req.files || {};

        // check if id exists
        if (id) {
            // get umrah package
            const umrahPackage = await UmrahPackage.findById(id);

            // check if umrah package madinah hotel thumbnail exists
            if (umrahPackage?.madinahhHotelThumbnail) {
                // delete previous madinah hotel thumbnail
                fs.unlinkSync(
                    path.join(__dirname, '../../../public/', umrahPackage.madinahhHotelThumbnail)
                );
            }
        }

        // prepare file path
        const madinahhHotelThumbnailPath = path.join(
            'uploads/',
            `${dir}/${Date.now()}_${madinahhHotelThumbnail.name}`
        );
        const uploadLogoPath = path.join(__dirname, '../../../public/', madinahhHotelThumbnailPath);

        // move file to upload path
        await madinahhHotelThumbnail.mv(uploadLogoPath);

        // set file path to request body
        req.files.madinahhHotelThumbnail.path = madinahhHotelThumbnailPath;

        // proceed to next middleware
        return next();
    };
