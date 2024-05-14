/**
 * @file /middlewares/umrah/packages/upload-umrah-day-wise-itinerary-thumbnail.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 May, 2024
 * @update_date 14 May, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
const { UmrahPackage } = require('../../../models');

// export umrah day wise itinerary thumbnail upload middleware
module.exports =
    (dir = '/umrah/package') =>
    async (req, res, next) => {
        // get validated data
        const { id } = req.params || {};
        const { itineraryThumbnails } = req.files || {};

        // check if id exists
        if (id) {
            // get umrah package
            const umrahPackage = await UmrahPackage.findById(id);

            // check if umrah package extra thumbnails exists
            if (umrahPackage?.itineraryThumbnails?.length > 0) {
                // delete previous extra thumbnails
                itineraryThumbnails.forEach((thumbnail) => {
                    fs.unlinkSync(path.join(__dirname, '../../../public/', thumbnail));
                });
            }
        }

        // prepare file path
        const updateItineraryThumbnails = itineraryThumbnails.map((thumbnail) => {
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
        req.files.itineraryThumbnails = updateItineraryThumbnails;

        // proceed to next middleware
        return next();
    };
