/**
 * @file /middlewares/settings/content/exclusive-offers/upload-exclusive-offers-file.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 19 April, 2024
 * @update_date 19 April, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
const { ContentExclusiveOffers } = require('../../../../models');

// export upload thumbnail middleware
module.exports =
    (dir = '/offers') =>
    async (req, res, next) => {
        // get validated data
        const { key } = req.body;
        const { thumbnail } = req.files;

        // get exclusive offer
        const exclusiveOffer = await ContentExclusiveOffers.findOne({ key });

        // check if exclusive offer thumbnail exists
        if (exclusiveOffer?.thumbnail) {
            // delete previous logo
            fs.unlinkSync(path.join(__dirname, '../../../../public/', exclusiveOffer.thumbnail));
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
