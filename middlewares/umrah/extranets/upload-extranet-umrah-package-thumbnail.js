/**
 * @file /middlewares/umrah/extranets/upload-extranet-umrah-package-thumbnail.js
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

// export umrah extranet umrah package thumbnail upload middleware
module.exports =
    (dir = '/umrah/extranet') =>
    async (req, res, next) => {
        // get validated data
        const { id } = req.params || {};
        const { umrahThumbnail } = req.files || {};

        // check if id exists
        if (id) {
            // get umrah extranet
            const umrahExtranet = await UmrahExtranet.findById(id);

            // check if umrah extranet umrah thumbnail exists
            if (umrahExtranet?.umrahThumbnail) {
                // delete previous umrah thumbnail
                fs.unlinkSync(
                    path.join(__dirname, '../../../public/', umrahExtranet.umrahThumbnail)
                );
            }
        }

        // prepare file path
        const umrahThumbnailPath = path.join(
            'uploads/',
            `${dir}/${Date.now()}_${umrahThumbnail.name}`
        );
        const uploadLogoPath = path.join(__dirname, '../../../public/', umrahThumbnailPath);

        // move file to upload path
        await umrahThumbnail.mv(uploadLogoPath);

        // set file path to request body
        req.files.umrahThumbnail.path = umrahThumbnailPath;

        // proceed to next middleware
        return next();
    };
