/**
 * @file /middlewares/settings/site/general/general-settings-file-uploader.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 13 April, 2024
 * @update_date 25 April, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
const { GeneralSettings } = require('../../../../models');

// upload logo middleware
const uploadLogo =
    (dir = '/logos') =>
    async (req, res, next) => {
        // get logo
        const { logo } = req.files || {};

        // get general settings
        const generalSettings = await GeneralSettings.findOne();

        // continue if no logo uploaded
        if (!logo) {
            return next();
        }

        // check if general settings has logo
        if (generalSettings?.logo) {
            // delete previous logo
            fs.unlinkSync(path.join(__dirname, '../../../../public/', generalSettings.logo));
        }

        // prepare file path
        const logoPath = path.join('uploads/', `${dir}/${Date.now()}_${logo.name}`);
        const uploadLogoPath = path.join(__dirname, '../../../../public/', logoPath);

        // move file to upload path
        await logo.mv(uploadLogoPath);

        // set file path to request body
        req.files.logo.path = logoPath;

        // proceed to next middleware
        return next();
    };

// upload favicon middleware
const uploadFavicon =
    (dir = '/logos') =>
    async (req, res, next) => {
        // get favicon
        const { favicon } = req.files || {};

        // get general settings
        const generalSettings = await GeneralSettings.findOne();

        // continue if no favicon uploaded
        if (!favicon) {
            return next();
        }

        // check if general settings has favicon
        if (generalSettings?.favicon) {
            // delete previous favicon
            fs.unlinkSync(path.join(__dirname, '../../../../public/', generalSettings.favicon));
        }

        // prepare file path
        const faviconPath = path.join('uploads/', `${dir}/${Date.now()}_${favicon.name}`);
        const uploadFaviconPath = path.join(__dirname, '../../../../public/', faviconPath);

        // move file to upload path
        await favicon.mv(uploadFaviconPath);

        // set file path to request body
        req.files.favicon.path = faviconPath;

        // proceed to next middleware
        return next();
    };
// export
module.exports = {
    logo: uploadLogo,
    favicon: uploadFavicon,
};
