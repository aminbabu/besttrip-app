/**
 * @file /middlewares/api/umrah/packages/upload-package-makka-hotel-thumbnail.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 May, 2024
 * @update_date 17 May, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { UmrahPackage } = require('../../../../models');

// export umrah package makka hotel thumbnail upload middleware
module.exports =
    (dir = '/umrah/package') =>
    async (req, res, next) => {
        let umrahPackage = {};

        // get validated data
        const { id } = req.params || {};
        const { makkahHotelThumbnail } = req.files || {};

        // check if id exists
        if (id) {
            // get umrah package
            umrahPackage = await UmrahPackage.findById(id);
        }

        // check if umrah package makka hotel thumbnail exists
        if (umrahPackage?.makkahHotelThumbnail) {
            // delete previous makka hotel thumbnail
            fs.unlinkSync(
                path.join(__dirname, '../../../public/', umrahPackage.makkahHotelThumbnail)
            );
        }

        // prepare file path
        const makkahHotelThumbnailPath = path.join(
            'uploads/',
            `${dir}/${uuidv4()}_${makkahHotelThumbnail.name}`
        );
        const uploadLogoPath = path.join(__dirname, '../../../public/', makkahHotelThumbnailPath);

        // move file to upload path
        await makkahHotelThumbnail.mv(uploadLogoPath);

        // set file path to request body
        req.files.makkahHotelThumbnail.path = makkahHotelThumbnailPath;

        // proceed to next middleware
        return next();
    };
