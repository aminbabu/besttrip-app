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

// Helper function to upload a file
const uploadThumbnail = (fileData, dir) => {
    const uniqueName = `${uuidv4()}_${fileData.name}`;
    const thumbnailPath = path.join('/uploads/', `${dir}/${uniqueName}`);
    const uploadPath = path.join(
        __dirname,
        '../../../../public',
        thumbnailPath
    );

    // Save file to the desired directory
    fileData.mv(uploadPath);

    return thumbnailPath;
};

// Helper function to remove old thumbnail only if new one is provided
const removeExistingThumbnail = (itinerary) => {
    if (itinerary?.thumbnail) {
        const previousThumbnailPath = path.join(
            __dirname,
            '../../../../public',
            itinerary.thumbnail
        );
        if (fs.existsSync(previousThumbnailPath)) {
            fs.unlinkSync(previousThumbnailPath);
        }
    }
};

// Middleware to handle itinerary thumbnail uploads
module.exports =
    (dir = '/umrah/package') =>
    async (req, res, next) => {
        let { id } = req.params || {};
        let { itineraryDays } = req.body || {};
        let umrahPackage = {};

        if (!itineraryDays?.length) return next();

        // Ensure itineraryDays is an array
        itineraryDays = Array.isArray(itineraryDays)
            ? itineraryDays
            : [itineraryDays];

        // If id exists, find the Umrah package
        if (id) umrahPackage = await UmrahPackage.findById(id);

        // POST Method: Save incoming thumbnails
        if (req.method === 'POST') {
            const updatedItineraryDays = itineraryDays.map((itinerary) => {
                const updatedItinerary = { ...itinerary };

                // Handle thumbnail file if exists
                if (updatedItinerary?.thumbnail) {
                    updatedItinerary.thumbnail.path = uploadThumbnail(
                        updatedItinerary?.thumbnail,
                        dir
                    );
                }

                return updatedItinerary;
            });

            // Set updated itinerary days to request body
            req.body.itineraryDays = updatedItineraryDays;
        }

        // PATCH Method: Replace old thumbnails if new ones are provided, else retain old ones
        if (req.method === 'PATCH') {
            const updatedItineraryDays = itineraryDays.map(
                (itinerary, index) => {
                    const updatedItinerary = { ...itinerary };

                    if (updatedItinerary?.thumbnail) {
                        removeExistingThumbnail(
                            umrahPackage.itineraryDays[index]
                        );
                        updatedItinerary.thumbnail.path = uploadThumbnail(
                            updatedItinerary.thumbnail,
                            dir
                        );
                    }
                    return updatedItinerary;
                }
            );

            // Set updated itinerary days to request body
            req.body.itineraryDays = updatedItineraryDays;
        }

        return next();
    };
