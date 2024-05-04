/**
 * @file /middlewares/umrah/extranets/upload-extranet-gallery.js
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

// export umrah extranet gallery upload middleware
module.exports =
    (dir = '/umrah/extranet') =>
    async (req, res, next) => {
        // get validated data
        const { id } = req.params || {};
        const { extraThumbnails } = req.files || {};

        // check if id exists
        if (id) {
            // get umrah extranet
            const umrahExtranet = await UmrahExtranet.findById(id);

            // check if umrah extranet extra thumbnails exists
            if (umrahExtranet?.extraThumbnails) {
                // delete previous extra thumbnails
                extraThumbnails.forEach((thumbnail) => {
                    fs.unlinkSync(path.join(__dirname, '../../../public/', thumbnail));
                });
            }
        }

        // prepare file path
        const updateExtraThumbnails = extraThumbnails.map((thumbnail) => {
            const newThumbnail = { ...thumbnail };
            const thumbnailPath = path.join(
                'uploads/',
                `${dir}/${Date.now()}_${newThumbnail.name}`
            );
            const uploadLogoPath = path.join(__dirname, '../../../public/', thumbnailPath);

            // move file to upload path
            newThumbnail.mv(uploadLogoPath);

            // set file path to thumbnail object
            newThumbnail.path = thumbnailPath;

            return newThumbnail;
        });

        // set file path to request body
        req.files.extraThumbnails = updateExtraThumbnails;

        // proceed to next middleware
        return next();
    };
