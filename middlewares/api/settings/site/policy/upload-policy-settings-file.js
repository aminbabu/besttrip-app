/**
 * @file /middlewares/settings/site/policy/upload-policy-settings-file.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 03 Jul, 2024
 * @update_date 03 Jul, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { GeneralSettings } = require('../../../../../models');

// export upload policy settings file middleware
module.exports =
    (dir = '/ckeditos') =>
    async (req, res, next) => {
        // get files
        const { files } = req || {};

        // prepare file path
        files.forEach(async (file) => {
            const filePath = path.join(
                'uploads/',
                `${dir}/${uuidv4()}_${file.name}`
            );
            const uploadPath = path.join(
                __dirname,
                '../../../../../public/',
                filePath
            );

            // move file to upload path
            await file.mv(uploadPath);

            // set file path to file object
            file.path = filePath;
        });

        // set files to request body
        req.files = files;

        // proceed to next middleware
        return next();
    };
