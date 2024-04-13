/**
 * @file /middlewares/settings/site/general/general-settings-file-uploader.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 13 April, 2024
 * @update_date 13 April, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
const { GeneralSettings } = require('../../../../models');

// export general settings file uploader middleware
module.exports =
    (dir = '/logos') =>
    async (req, res, next) => {
        // continue if no files uploaded
        if (!req.files || !req.files.length) {
            return next();
        }

        // get logo and favicon
        const [logo, favicon] = req.files;

        // get general settings
        const generalSettings = await GeneralSettings.findOne();

        // check if general settings has logo
        if (generalSettings.logo) {
            // delete previous logo
            fs.unlinkSync(path.join(__dirname, '../../../../public/', generalSettings.logo));
        }

        // check if general settings has favicon
        if (generalSettings.favicon) {
            // delete previous favicon
            fs.unlinkSync(path.join(__dirname, '../../../../public/', generalSettings.favicon));
        }

        // prepare file paths
        const logoPath = path.join('uploads/', `${dir}/${Date.now()}_${logo.name}`);
        const faviconPath = path.join('uploads/', `${dir}/${Date.now()}_${favicon.name}`);

        const uploadLogoPath = path.join(__dirname, '../../../../public/', logoPath);
        const uploadFaviconPath = path.join(__dirname, '../../../../public/', faviconPath);

        // move files to upload paths
        await logo.mv(uploadLogoPath);
        await favicon.mv(uploadFaviconPath);

        // set file paths to request body
        req.body.logo = logoPath;
        req.body.favicon = faviconPath;

        // continue to next middleware
        return next();
    };
