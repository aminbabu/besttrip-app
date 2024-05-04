/**
 * @file /middlewares/umrah/extranets/upload-extranet-madinah-hotel-thumbnail.js
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

// export umrah extranet madinah hotel thumbnail upload middleware
module.exports =
    (dir = '/umrah/extranet') =>
    async (req, res, next) => {
        // get validated data
        const { id } = req.params || {};
        const { madinahhHotelThumbnail } = req.files || {};

        // check if id exists
        if (id) {
            // get umrah extranet
            const umrahExtranet = await UmrahExtranet.findById(id);

            // check if umrah extranet madinah hotel thumbnail exists
            if (umrahExtranet?.madinahhHotelThumbnail) {
                // delete previous madinah hotel thumbnail
                fs.unlinkSync(
                    path.join(__dirname, '../../../public/', umrahExtranet.madinahhHotelThumbnail)
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
