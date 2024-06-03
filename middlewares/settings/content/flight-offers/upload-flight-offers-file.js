/**
 * @file /middlewares/settings/content/flight-offers/upload-flight-offers-file.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 17 May, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { FlightOffer } = require('../../../../models');

// export upload thumbnail middleware
module.exports =
    (dir = '/offers') =>
    async (req, res, next) => {
        let flightOffer = {};

        // get validated data
        const { id } = req.params || {};
        const { thumbnail } = req.files || {};

        // check if id is provided
        if (id) {
            // get flight offer
            flightOffer = await FlightOffer.findById(id);
        }

        // check if flight offer thumbnail exists
        if (flightOffer?.thumbnail) {
            // delete previous thumbnail
            fs.unlinkSync(path.join(__dirname, '../../../../public/', flightOffer.thumbnail));
        }

        // prepare file path
        const thumbnailPath = path.join('uploads/', `${dir}/${uuidv4()}_${thumbnail.name}`);
        const uploadLogoPath = path.join(__dirname, '../../../../public/', thumbnailPath);

        // move file to upload path
        await thumbnail.mv(uploadLogoPath);

        // set file path to request body
        req.files.thumbnail.path = thumbnailPath;

        // proceed to next middleware
        return next();
    };
