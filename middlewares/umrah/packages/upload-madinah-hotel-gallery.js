/**
 * @file /middlewares/umrah/packages/upload-package-madinah-hotel-gallery.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 May, 2024
 * @update_date 10 May, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
const { UmrahPackage } = require('../../../models');

// export umrah package madinah hotel gallery upload middleware
module.exports =
    (dir = '/umrah/package') =>
    async (req, res, next) => {
        // get validated data
        const { id } = req.params || {};
        const { madinahhHotelExtraThumbnails } = req.files || {};

        // check if id exists
        if (id) {
            // get umrah package
            const umrahPackage = await UmrahPackage.findById(id);

            // check if umrah package madinahh hotel extra thumbnails exists
            if (umrahPackage?.madinahhHotelExtraThumbnails) {
                // delete previous extra thumbnails
                madinahhHotelExtraThumbnails.forEach((thumbnail) => {
                    fs.unlinkSync(path.join(__dirname, '../../../public/', thumbnail));
                });
            }
        }

        // prepare file path
        const updateExtraThumbnails = madinahhHotelExtraThumbnails.map((thumbnail) => {
            const updatedThumbnail = { ...thumbnail };
            const thumbnailPath = path.join(
                'uploads/',
                `${dir}/${Date.now()}_${updatedThumbnail.name}`
            );
            const uploadLogoPath = path.join(__dirname, '../../../public/', thumbnailPath);

            // move file to upload path
            updatedThumbnail.mv(uploadLogoPath);

            // set file path to thumbnail object
            updatedThumbnail.path = thumbnailPath;

            return updatedThumbnail;
        });

        // set file path to request body
        req.files.madinahhHotelExtraThumbnails = updateExtraThumbnails;

        // proceed to next middleware
        return next();
    };
