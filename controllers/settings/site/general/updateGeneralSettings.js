/**
 * @file /controllers/settings/site/general/updateGeneralSettings.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 April, 2024
 * @update_date 04 April, 2024
 */

// dependencies
const { GeneralSettings } = require('../../../../models');
const fileUploader = require('../../../../utils/file-uploader');

// update general settings
module.exports = async (req, res, next) => {
    try {
        const { logo, favicon, title, domain, description } = req.body;

        // check if logo is empty
        if (logo) {
            const { filepath } = await fileUploader(logo[0], '/uploads/logos');
            req.body.logo = filepath;
        }

        // check if favicon is empty
        if (favicon) {
            const { filepath } = await fileUploader(favicon[0], '/uploads/logos');
            req.body.favicon = filepath;
        }

        // destructuring title
        [req.body.title] = title;

        if (domain) {
            // destructuring domain
            [req.body.domain] = domain;
        }

        if (description) {
            // destructuring description
            [req.body.description] = description;
        }

        // get general settings
        const generalSettings = await GeneralSettings.findOne();

        // update general settings
        const updatedGeneralSettings = await GeneralSettings.findByIdAndUpdate(
            generalSettings?._id,
            req.body,
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true,
            }
        );

        // response
        return res.status(200).json({
            message: 'General settings updated successfully',
            generalSettings: updatedGeneralSettings,
        });
    } catch (error) {
        return next(error);
    }
};
