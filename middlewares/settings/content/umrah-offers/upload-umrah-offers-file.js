/**
 * @file /middlewares/settings/content/umrah-offers/upload-umrah-offers-file.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 20 April, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
const { UmrahOffer } = require('../../../../models');

// export upload thumbnail middleware
module.exports =
    (dir = '/offers') =>
    async (req, res, next) => {
        // get validated data
        const { key } = req.body;
        const { thumbnail } = req.files;

        // get umrah offer
        const umrahOffer = await UmrahOffer.findOne({ key });

        // check if umrah offer thumbnail exists
        if (umrahOffer?.thumbnail) {
            // delete previous thumbnail
            fs.unlinkSync(path.join(__dirname, '../../../../public/', umrahOffer.thumbnail));
        }

        // prepare file path
        const thumbnailPath = path.join('uploads/', `${dir}/${Date.now()}_${thumbnail.name}`);
        const uploadLogoPath = path.join(__dirname, '../../../../public/', thumbnailPath);

        // move file to upload path
        await thumbnail.mv(uploadLogoPath);

        // set file path to request body
        req.files.thumbnail.path = thumbnailPath;

        // proceed to next middleware
        return next();
    };
