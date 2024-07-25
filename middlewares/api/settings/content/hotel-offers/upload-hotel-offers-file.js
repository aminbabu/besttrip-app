/**
 * @file /middlewares/settings/content/hotel-offers/upload-hotel-offers-file.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 03 Jul, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { HotelOffer } = require('../../../../../models');

// export upload thumbnail middleware
module.exports =
    (dir = '/offers') =>
    async (req, res, next) => {
        let hotelOffer = {};

        // get validated data
        const { id } = req.params || {};
        const { thumbnail } = req.files || {};

        // check if id exists
        if (id) {
            // get hotel offer
            hotelOffer = await HotelOffer.findById(id);
        }

        // check if thumbnail is not uploaded
        if (hotelOffer && !thumbnail) {
            return next();
        }

        // check if hotel offer thumbnail exists
        if (hotelOffer?.thumbnail) {
            // delete previous thumbnail
            fs.unlinkSync(
                path.join(
                    __dirname,
                    './../../../../../public',
                    hotelOffer.thumbnail
                )
            );
        }

        // prepare file path
        const thumbnailPath = path.join(
            '/uploads/',
            `${dir}/${uuidv4()}_${thumbnail.name}`
        );
        const uploadLogoPath = path.join(
            __dirname,
            './../../../../../public',
            thumbnailPath
        );

        // move file to upload path
        await thumbnail.mv(uploadLogoPath);

        // set file path to request body
        req.files.thumbnail.path = thumbnailPath;

        // proceed to next middleware
        return next();
    };
