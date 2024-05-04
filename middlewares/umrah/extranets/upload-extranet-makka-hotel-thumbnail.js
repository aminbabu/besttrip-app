/**
 * @file /middlewares/umrah/extranets/upload-extranet-makka-hotel-thumbnail.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 May, 2024
 * @update_date 04 May, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
const { UmrahExtranet } = require('../../../models');

// export umrah extranet makka hotel thumbnail upload middleware
module.exports =
    (dir = '/umrah/extranet') =>
    async (req, res, next) => {
        // get validated data
        const { id } = req.params || {};
        const { makkahHotelThumbnail } = req.files || {};

        // check if id exists
        if (id) {
            // get umrah extranet
            const umrahExtranet = await UmrahExtranet.findById(id);

            // check if umrah extranet makka hotel thumbnail exists
            if (umrahExtranet?.makkahHotelThumbnail) {
                // delete previous makka hotel thumbnail
                fs.unlinkSync(
                    path.join(__dirname, '../../../public/', umrahExtranet.makkahHotelThumbnail)
                );
            }
        }

        // prepare file path
        const makkahHotelThumbnailPath = path.join(
            'uploads/',
            `${dir}/${Date.now()}_${makkahHotelThumbnail.name}`
        );
        const uploadLogoPath = path.join(__dirname, '../../../public/', makkahHotelThumbnailPath);

        // move file to upload path
        await makkahHotelThumbnail.mv(uploadLogoPath);

        // set file path to request body
        req.files.makkahHotelThumbnail.path = makkahHotelThumbnailPath;

        // proceed to next middleware
        return next();
    };
