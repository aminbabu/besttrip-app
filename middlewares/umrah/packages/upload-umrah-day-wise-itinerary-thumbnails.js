/**
 * @file /middlewares/umrah/packages/upload-umrah-day-wise-itinerary-thumbnail.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 May, 2024
 * @update_date 17 May, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { UmrahPackage } = require('../../../models');

// export umrah day wise itinerary thumbnail upload middleware
module.exports =
    (dir = '/umrah/package') =>
    async (req, res, next) => {
        let umrahPackage = {};

        // get validated data
        const { id } = req.params || {};
        const { itineraryDays } = req.files || {};

        // check if extra thumbnails exists
        if (!itineraryDays) {
            return next();
        }

        // check if id exists
        if (id) {
            // get umrah package
            umrahPackage = await UmrahPackage.findById(id);
        }

        // check if umrah package extra thumbnails exists
        if (umrahPackage?.itineraryDays?.length > 0) {
            // delete previous extra thumbnails
            umrahPackage.itineraryDays.forEach(
                (itinerary) =>
                    itinerary?.thumbnail &&
                    fs.unlinkSync(path.join(__dirname, '../../../public/', itinerary.thumbnail))
            );
        }

        // prepare file path
        const updateItineraryDays = itineraryDays.map((itinerary) => {
            const updatedItinerary = { ...itinerary };
            const thumbnailPath = path.join(
                'uploads/',
                `${dir}/${uuidv4()}_${updatedItinerary.thumbnail.name}`
            );
            const uploadLogoPath = path.join(__dirname, '../../../public/', thumbnailPath);

            // move file to upload path
            updatedItinerary.thumbnail.mv(uploadLogoPath);

            // set file path to thumbnail object
            updatedItinerary.thumbnail.path = thumbnailPath;

            return updatedItinerary;
        });

        // set file path to request body
        req.files.itineraryDays = updateItineraryDays;

        // proceed to next middleware
        return next();
    };
