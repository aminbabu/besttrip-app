/**
 * @file /middlewares/api/umrah/travelers/upload-traveler-photo
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
const { Traveler } = require('../../../../models');

// export travelerPhoto upload middleware
module.exports =
    (dir = '/umrah/traveler') =>
    async (req, res, next) => {
        let traveler = {};

        // get validated data
        const { id } = req.params || {};
        const { travelerPhoto } = req.files || {};

        // check if id exists
        if (id) {
            // get traveler
            traveler = await Traveler.findById(id);
        }

        // check if travelerPhoto exists
        if (traveler?.travelerPhoto) {
            // delete previous travelerPhoto
            fs.unlinkSync(
                path.join(
                    __dirname,
                    './../../../../public',
                    traveler.travelerPhoto
                )
            );
        }

        // prepare file path
        const travelerPhotoPath = path.join(
            '/uploads/',
            `${dir}/${uuidv4()}_${travelerPhoto.name}`
        );
        const uploadLogoPath = path.join(
            __dirname,
            './../../../../public',
            travelerPhotoPath
        );

        // move file to upload path
        await travelerPhoto.mv(uploadLogoPath);

        // set file path to request body
        req.files.travelerPhoto.path = travelerPhotoPath;

        // proceed to next middleware
        return next();
    };
