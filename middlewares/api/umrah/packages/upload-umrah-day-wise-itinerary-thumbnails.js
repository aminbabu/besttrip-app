/**
 * @file /middlewares/api/umrah/packages/upload-umrah-day-wise-itinerary-thumbnail.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 May, 2024
 * @update_date 03 Jul, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { UmrahPackage } = require('../../../../models');

// export umrah day-wise itinerary thumbnail upload middleware
module.exports =
    (dir = '/umrah/package') =>
    async (req, res, next) => {
        let umrahPackage = {};

        // get validated data
        const { id } = req.params || {};
        let { itineraryDays } = req.body || {};

        // check if itineraryDays exists
        if (!itineraryDays) {
            return next();
        }

        // Convert itineraryDays to an array if it's not already
        if (!Array.isArray(itineraryDays)) {
            itineraryDays = [itineraryDays];
        }

        // check if id exists
        if (id) {
            // get umrah package
            umrahPackage = await UmrahPackage.findById(id);
        }

        // check if umrah package has existing itinerary thumbnails and delete them
        if (umrahPackage?.itineraryDays?.length > 0) {
            umrahPackage.itineraryDays.forEach((itinerary) => {
                if (itinerary?.thumbnail) {
                    const previousThumbnailPath = path.join(
                        __dirname,
                        '../../../../public',
                        itinerary.thumbnail
                    );

                    // Only delete the file if it exists
                    if (fs.existsSync(previousThumbnailPath)) {
                        fs.unlinkSync(previousThumbnailPath);
                    }
                }
            });
        }

        // Prepare file path for new thumbnails and upload them
        const updatedItineraryDays = itineraryDays.map((itinerary) => {
            const updatedItinerary = { ...itinerary };
            if (req.files && updatedItinerary.thumbnail) {
                const thumbnailFile = req.files[updatedItinerary.thumbnail];

                // Check if the file exists before moving
                if (thumbnailFile) {
                    const thumbnailPath = path.join(
                        '/uploads/',
                        `${dir}/${uuidv4()}_${thumbnailFile.name}`
                    );
                    const uploadPath = path.join(
                        __dirname,
                        '../../../../public',
                        thumbnailPath
                    );

                    // Move file to upload path
                    thumbnailFile.mv(uploadPath);

                    // Set file path to thumbnail object
                    updatedItinerary.thumbnail = thumbnailPath;
                }
            }
            return updatedItinerary;
        });

        // Set updated file paths to request body
        req.body.itineraryDays = updatedItineraryDays;

        // Proceed to next middleware
        return next();
    };
